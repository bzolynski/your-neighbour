import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { HttpError } from '../models';
import { IItem, IUser } from '../models/api';
import { Response } from '../models/api/response.model';
import { GetItemQueryParams, ItemService } from 'src/app/modules/core/services/item.service';
import { AuthenticationStore } from '../../authentication/data-access';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

type ItemState = GenericState<IItem[]>;

@Injectable({
    providedIn: 'root',
})
export class ItemStore extends ComponentStore<ItemState> {
    readonly items$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadItemsForLoggedInUser = this.effect<GetItemQueryParams>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService.getByUser(user.id, params).pipe(
                            tapResponse(
                                (response) => {
                                    this.patchState({ data: response.responseObject });
                                },
                                (error: HttpError<Response>) => {
                                    this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };

    constructor(
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router
    ) {
        super({} as ItemState);
    }
}
