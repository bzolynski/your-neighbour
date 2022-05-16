import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { ICategory } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyItemsState {
    listViewType: ListViewType;
    categories: ICategory[];
}

@Injectable()
export class SettingsMyItemsStore extends ComponentStore<SettingsMyItemsState> {
    readonly categories$ = this.select((state) => state.categories);
    readonly listViewType$ = this.select((state) => state.listViewType);

    readonly loadCategories = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ categories: undefined })),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ categories: response });
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.message, 'error');
    };

    constructor(private categoryService: CategoryService, private messageService: MessageService) {
        super({ listViewType: 'list' } as SettingsMyItemsState);
    }
}
