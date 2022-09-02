import { GenericState } from '@app-types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CategoryService } from '@services/.';
import { switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Category } from '@models/';

type CategoryState = GenericState<Category[]>;

@Injectable()
export class CategoryStore extends ComponentStore<CategoryState> {
    readonly categories$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadCategories = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', data: undefined, error: undefined })),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ data: response, status: 'success' });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );
    private handleError = (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error ?? error.message });
        this.patchState({ error: error.message, status: 'error' });
    };

    constructor(private categoryService: CategoryService, private messageService: MessageService) {
        super(<CategoryState>{});
    }
}
