import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ChatService } from 'src/app/messages/data-access/api/chat.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { AdvertisementService, FavoriteAdvertisementService, UserService } from '@services/.';
import { User } from '@models/';
import {
    addFavorite,
    addFavoriteError,
    addFavoriteSuccess,
    deleteFavorite,
    deleteFavoriteError,
    deleteFavoriteSuccess,
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadImagesError,
    loadUserSuccess,
    redirectToChat,
    redirectToChatSuccess,
    setIsOwner,
} from './advertisement-details.actions';

@Injectable()
export class AdvertisementDetailsEffects {
    constructor(
        private actions$: Actions,
        private advertisementService: AdvertisementService,
        private userService: UserService,
        private authStore: AuthenticationStore,
        private favoriteService: FavoriteAdvertisementService,
        private chatService: ChatService,
        private router: Router
    ) {}
    loadAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisement),
            switchMap(({ id }) =>
                this.advertisementService.get(id, {
                    includeCategory: true,
                    includeDefinition: true,
                    includeLocalization: true,
                    includeUser: true,
                    includeItem: true,
                })
            ),
            map((advertisement) => loadAdvertisementSuccess({ advertisement: advertisement })),
            catchError((error: HttpErrorResponse) => of(loadAdvertisementError({ error: error.error ?? error.message })))
        )
    );

    // loadImages$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadAdvertisementSuccess),
    //         switchMap(({ advertisement }) => this.itemService.getImagesByItem(advertisement.item.id)),
    //         map((images) => loadImagesSuccess({ images: images })),
    //         catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
    //     )
    // );

    isOwner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisementSuccess),
            switchMap(({ advertisement }) =>
                this.authStore.user$.pipe(
                    map((user) => {
                        let isOwner = false;
                        if (user) isOwner = user.id === advertisement.userId;
                        return setIsOwner({ isOwner: isOwner });
                    })
                )
            )
        )
    );

    loadFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisementSuccess),
            switchMap(({ advertisement }) =>
                this.authStore.user$.pipe(
                    filter((user): user is User => user !== null),
                    switchMap((user) => this.favoriteService.isFavorite(user.id, advertisement.id)),
                    filter((response) => response),
                    map(() => addFavoriteSuccess())
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisementSuccess),
            switchMap(({ advertisement }) => this.userService.get(advertisement.userId)),
            map((user) => loadUserSuccess({ user: user })),
            catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
        )
    );

    addFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addFavorite),
            switchMap(({ advertisementId }) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is User => user !== null),
                    switchMap((user) => this.favoriteService.create(user.id, advertisementId)),
                    map(() => addFavoriteSuccess()),
                    catchError((error: HttpErrorResponse) => of(addFavoriteError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    deleteFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFavorite),
            switchMap(({ advertisementId }) =>
                this.authStore.user$.pipe(
                    filter((user): user is User => user !== null),
                    switchMap((user) => this.favoriteService.delete(user.id, advertisementId)),
                    map(() => deleteFavoriteSuccess()),
                    catchError((error: HttpErrorResponse) => of(deleteFavoriteError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    redirectToChat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(redirectToChat),
            withLatestFrom(this.authStore.user$),
            tap(([_, user]) => this.checkUserLoggedIn(user)),
            switchMap(([action, user]) =>
                this.chatService.getChatId([action.ownerId, user!.id]).pipe(
                    map((chatId) => {
                        this.router.navigate(['/messages', chatId]);
                        return redirectToChatSuccess();
                    }),
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 404) {
                            return this.chatService.addToChat([action.ownerId, user!.id]).pipe(
                                map((chatId) => {
                                    this.router.navigate(['/messages', chatId]);
                                    return redirectToChatSuccess();
                                })
                            );
                        }
                        return of(deleteFavoriteError({ error: error.error ?? error.message }));
                    })
                )
            )
        )
    );

    private readonly checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            throwError(new Error('Nie jesteś zalogowany!'));
        }
    };
}
