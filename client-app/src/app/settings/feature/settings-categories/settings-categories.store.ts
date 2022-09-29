import { Category, CategoryDefinition } from '@models/';
import { GenericState, GenericStoreStatus } from '@app-types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CategoryDefinitionsService, CategoryService } from '@services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MessageService, TreeNode } from 'primeng/api';
import { iif, of } from 'rxjs';

export type FormMode = 'edit' | 'create';

interface SettingsCategoriesState extends GenericState<TreeNode<Category>[]> {
    formOpen: boolean;
    definitions: CategoryDefinition[];
    formStatus: GenericStoreStatus;
    formMode: FormMode | undefined;
}

@Injectable()
export class SettingsCategoriesStore extends ComponentStore<SettingsCategoriesState> {
    readonly rootCategoryTree$ = this.select((state) => state.data);
    readonly status$ = this.select((state) => state.status);
    readonly error$ = this.select((state) => state.error);
    readonly formOpen$ = this.select((state) => state.formOpen);
    readonly definitions$ = this.select((state) => state.definitions);
    readonly formStatus$ = this.select((state) => state.formStatus);
    readonly formMode$ = this.select((state) => state.formMode);

    constructor(
        private store: Store,
        private categoryService: CategoryService,
        private categoryDefinitionService: CategoryDefinitionsService,
        private messageService: MessageService
    ) {
        super({} as SettingsCategoriesState);
    }
    readonly expandNode = this.effect<TreeNode<Category>>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap((node) =>
                iif(
                    () =>
                        node.expanded !== undefined &&
                        node.expanded === true &&
                        (!node.children || (node.children && node.children?.length < 1)),
                    this.categoryService.getManyByParent(node.data!.id, { includeDefinition: true }).pipe(
                        map((children) => ({
                            ...node,
                            leaf: children.length < 1,
                            children: children.map(
                                (value) =>
                                    ({
                                        label: value?.name,
                                        data: value ?? undefined,
                                        draggable: true,
                                        droppable: true,
                                        key: value?.guid,
                                        leaf: false,
                                    } as TreeNode<Category>)
                            ),
                        }))
                    ),
                    of(node)
                )
            ),
            withLatestFrom(this.rootCategoryTree$),
            tapResponse(
                ([response, rootCategoryTree]) => {
                    const updated = this.updateNode(rootCategoryTree![0], response);
                    this.patchState({ data: [updated], status: 'success' });
                },
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.error, status: 'error' });
                    this.handleError(error);
                }
            )
        )
    );

    readonly moveNode = this.effect<{ movedId: number; newParentNode: TreeNode<Category> }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap(({ movedId, newParentNode }) =>
                this.categoryService.changeParent(movedId, newParentNode.data!.id).pipe(
                    withLatestFrom(this.rootCategoryTree$),
                    tapResponse(
                        ([_, rootCategoryTree]) => {
                            const updated = this.updateNode(rootCategoryTree![0], newParentNode);
                            this.patchState({ data: [updated], status: 'success' });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Przeniesiono kategorię!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, status: 'error' });
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly loadRootCategory = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', data: null })),
            switchMap(() => this.categoryService.getRoot({ includeChildren: true, includeDefinition: true })),
            tapResponse(
                (response) => {
                    const rootNode = {
                        label: response?.name,
                        data: response ?? undefined,
                        draggable: false,
                        expanded: true,
                        droppable: true,
                        key: response?.guid,
                        children: response?.children?.map((value) => ({
                            label: value?.name,
                            data: value ?? undefined,
                            draggable: true,
                            droppable: true,
                            key: value?.guid,
                            leaf: false,
                        })),
                    } as TreeNode<Category>;
                    this.patchState({ data: [rootNode], status: 'success' });
                },
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.error, status: 'error' });
                    this.handleError(error);
                }
            )
        )
    );

    readonly loadDefinitions = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(() =>
                this.categoryDefinitionService.getAll().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ definitions: response, formStatus: 'success' });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );
    readonly createCategory = this.effect<{ category: Category; parentId: number }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(({ category, parentId }) =>
                this.categoryService.create(category).pipe(
                    withLatestFrom(this.rootCategoryTree$),
                    tapResponse(
                        ([response, rootNode]) => {
                            const updatedNode = this.addChildToParentNode(
                                rootNode![0],
                                {
                                    label: category.name,
                                    data: { ...category, id: response },
                                    draggable: true,
                                    droppable: true,
                                    key: category.guid,
                                } as TreeNode<Category>,
                                parentId
                            );
                            this.patchState({ formStatus: 'success', data: [updatedNode], formOpen: false, formMode: undefined });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Pomyślnie dodano kategorię: ${category.name}!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly updateCategory = this.effect<{ id: number; category: Category }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(({ category, id }) =>
                this.categoryService.update(id, category).pipe(
                    withLatestFrom(this.rootCategoryTree$),
                    tapResponse(
                        ([_, rootNode]) => {
                            const updatedNode = this.updateNode(rootNode![0], {
                                label: category.name,
                                data: { ...category, id: id },
                            } as TreeNode<Category>);

                            this.patchState({ formStatus: 'success', data: [updatedNode], formOpen: false, formMode: undefined });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Pomyślnie zaktualizowano kategorię: ${category.name}!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly deleteCategory = this.effect<{ id: number }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap(({ id }) =>
                this.categoryService.delete(id).pipe(
                    withLatestFrom(this.rootCategoryTree$),
                    tapResponse(
                        ([_, rootNode]) => {
                            const updatedNode = this.removeNode(id, rootNode![0]);

                            this.patchState({ status: 'success', data: [updatedNode] });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Pomyślnie usunięto kategorię!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, status: 'error' });
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly setFormOpen = this.updater<{ open: boolean; mode?: FormMode }>((state, { open, mode }) => {
        return { ...state, formOpen: open, formMode: mode };
    });

    private updateNode = (existingNode: TreeNode<Category>, newNode: TreeNode<Category>): TreeNode<Category> => {
        if (existingNode.data?.id === newNode.data?.id)
            return { ...existingNode, ...newNode, data: { ...existingNode.data!, ...newNode.data! } };
        return { ...existingNode, children: existingNode.children?.map((value) => this.updateNode(value, newNode)) };
    };

    private removeNode = (id: number, existingNode: TreeNode<Category>): TreeNode<Category> => {
        const children = existingNode.children?.filter((value) => value.data?.id !== id);
        if (children?.length !== existingNode.children?.length)
            return {
                ...existingNode,
                children: children,
                expanded: existingNode.expanded && children && children?.length > 0 ? true : false,
                leaf: children && children?.length > 0 ? false : true,
            };
        return { ...existingNode, children: children?.map((value) => this.removeNode(id, value)) } as TreeNode<Category>;
    };

    private addChildToParentNode = (
        existingNode: TreeNode<Category>,
        newNode: TreeNode<Category>,
        parentId: number
    ): TreeNode<Category> => {
        if (existingNode.data?.id === parentId && existingNode.expanded === true) {
            return { ...existingNode, children: [...(existingNode.children ?? []), newNode] };
        }
        return {
            ...existingNode,
            leaf: false,
            children: existingNode.children?.map((value) => this.addChildToParentNode(value, newNode, parentId)),
        };
    };

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error });
    };
}
