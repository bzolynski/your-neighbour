import { Component, OnInit } from '@angular/core';
import { Category } from '@models/category.model';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormMode, SettingsCategoriesStore } from './settings-categories.store';
import { TreeDragDropService } from 'primeng/api';
import { FormGroup, Validators } from '@angular/forms';
import { GenericFormControl } from '@app-types/generic-form.type';
import { CategoryDefinition } from '@models/category-definition.model';
@Component({
    selector: 'app-settings-categories',
    templateUrl: './settings-categories.component.html',
    styleUrls: ['./settings-categories.component.scss'],
    providers: [SettingsCategoriesStore, TreeDragDropService],
})
export class SettingsCategoriesComponent implements OnInit {
    vm$ = combineLatest([
        this.componentStore.rootCategoryTree$,
        this.componentStore.formOpen$,
        this.componentStore.definitions$,
        this.componentStore.formStatus$,
        this.componentStore.formMode$,
        this.componentStore.status$,
    ]).pipe(
        map(([rootCategoryTree, formOpen, definitions, formStatus, formMode, status]) => ({
            rootCategoryTree,
            formOpen,
            definitions,
            formStatus,
            formMode,
            status,
        }))
    );

    form: FormGroup = new FormGroup({
        id: new GenericFormControl<number>(undefined),
        parentId: new GenericFormControl<number>(undefined),
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        definition: new GenericFormControl<CategoryDefinition>(undefined, [Validators.required]),
        isActive: new GenericFormControl<boolean>(true),
    });

    get nameErrorMessage() {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        return '';
    }
    get definitionErrorMessage() {
        const control = this.form.controls['definition'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(private componentStore: SettingsCategoriesStore, private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.componentStore.loadRootCategory();
        this.componentStore.loadDefinitions();
    }
    editCategory(category: Category): void {
        this.form.patchValue({
            id: category.id,
            parentId: category.parentId,
            name: category.name,
            isActive: category.isActive,
            definition: category.definition,
        });
        this.componentStore.setFormOpen({ open: true, mode: 'edit' });
    }
    createCategory(category: Category): void {
        this.form.patchValue({ parentId: category.id });
        this.componentStore.setFormOpen({ open: true, mode: 'create' });
    }
    deleteCategory(category: Category): void {
        this.confirmationService.confirm({
            message: `Czy na pewno chcesz usunąć kategorię ${category.name}?`,
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.componentStore.deleteCategory({ id: category.id });
            },
        });
    }
    closeForm(): void {
        this.form.reset();
        this.componentStore.setFormOpen({ open: false });
    }
    submitForm(formMode?: FormMode): void {
        this.form.markAllAsTouched();
        if (!this.form.valid || !formMode) return;
        if (formMode === 'create') {
            this.componentStore.createCategory({
                category: {
                    parentId: this.form.value['parentId'],
                    name: this.form.value['name'],
                    isActive: this.form.value['isActive'],
                    definitionId: this.form.value['definition'].id,
                } as Category,
                parentId: this.form.value['parentId'],
            });
        } else {
            this.componentStore.updateCategory({
                category: {
                    name: this.form.value['name'],
                    isActive: this.form.value['isActive'],
                    definitionId: this.form.value['definition'].id,
                } as Category,
                id: this.form.value['id'],
            });
        }
    }
    trackNodeBy(index: number, item: TreeNode<Category>): unknown {
        return item.data?.id ?? index;
    }
    triggerNodeExpand(event: { node: TreeNode<Category>; originalEvent: Event }): void {
        this.componentStore.expandNode(event.node);
    }
    moveNode(event: { dragNode: TreeNode<Category>; dropNode: TreeNode<Category>; accept: () => void }): void {
        if (event.dragNode.parent !== event.dropNode) {
            event.accept();
            this.componentStore.moveNode({ movedId: event.dragNode.data!.id, newParentNode: event.dropNode });
        }
    }
}
