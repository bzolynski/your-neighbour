import { CategoryDefinition } from '@core/models/';
import { GenericState, GenericStoreStatus } from '@core/types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { CategoryDefinitionsService } from '@core/services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

export type FormMode = 'edit' | 'create';

interface SettingsCategoryDefinitionsState extends GenericState<CategoryDefinition[]> {
    formOpen: boolean;
    formStatus: GenericStoreStatus;
    formMode: FormMode | undefined;
}

@Injectable()
export class SettingsCategoryDefinitionsStore extends ComponentStore<SettingsCategoryDefinitionsState> {
    readonly definitions$ = this.select((state) => state.data);
    readonly formOpen$ = this.select((state) => state.formOpen);
    readonly formStatus$ = this.select((state) => state.formStatus);
    readonly formMode$ = this.select((state) => state.formMode);

    constructor(
        private store: Store,
        private categoryDefinitionService: CategoryDefinitionsService,
        private messageService: MessageService
    ) {
        super({} as SettingsCategoryDefinitionsState);
    }

    readonly loadDefinitions = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(() =>
                this.categoryDefinitionService.getAll().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ data: response, formStatus: 'success' });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                        }
                    )
                )
            )
        )
    );

    readonly createDefinition = this.effect<{ definition: CategoryDefinition }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(({ definition }) =>
                this.categoryDefinitionService.create(definition).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState((state) => ({
                                data: [...(state.data ?? []), { ...definition, id: response }],
                                formStatus: 'success',
                                formOpen: false,
                                formMode: undefined,
                            }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Pomyślnie dodano definicję: ${definition.name}!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                        }
                    )
                )
            )
        )
    );

    readonly updateDefinition = this.effect<{ id: number; definition: CategoryDefinition }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ formStatus: 'loading' })),
            switchMap(({ id, definition }) =>
                this.categoryDefinitionService.update(id, definition).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: state.data?.map((value) => (value.id === id ? { ...value, ...definition } : value)),
                                formStatus: 'success',
                                formOpen: false,
                                formMode: undefined,
                            }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Pomyślnie uaktualniono definicję: ${definition.name}!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, formStatus: 'error' });
                        }
                    )
                )
            )
        )
    );

    readonly deleteDefinition = this.effect<{ id: number }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap(({ id }) =>
                this.categoryDefinitionService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: state.data?.filter((value) => value.id !== id),
                                status: 'success',
                            }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: `Usunięto definicję!`,
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.error, status: 'error' });
                        }
                    )
                )
            )
        )
    );

    readonly setFormOpen = this.updater<{ open: boolean; mode?: FormMode }>((state, { open, mode }) => {
        return { ...state, formOpen: open, formMode: mode };
    });
}
