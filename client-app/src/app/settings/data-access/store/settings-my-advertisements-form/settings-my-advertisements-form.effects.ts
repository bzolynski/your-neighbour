import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AdvertisementDefinitionService, AdvertisementService, LocalizationService } from '@services/.';
import { User } from '@models/';
import {
    createAdvertisement,
    createAdvertisementError,
    createAdvertisementSuccess,
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadDefinitions,
    loadDefinitionsError,
    loadDefinitionsSuccess,
    loadLocalizations,
    loadLocalizationsError,
    loadLocalizationsSuccess,
    updateAdvertisement,
    updateAdvertisementError,
    updateAdvertisementSuccess,
} from './settings-my-advertisements-form.actions';
import { Observable } from 'rxjs';
import { selectUser } from '@stores/authentication';

@Injectable()
export class SettingsMyAdvertisementsFormEffects {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(
        private actions$: Actions,
        private advertisementService: AdvertisementService,
        private store: Store,
        private messageService: MessageService,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService,
        private router: Router
    ) {}

    loadAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisement),
            switchMap(({ id }) =>
                this.advertisementService
                    .get(id, { includeCategory: true, includeLocalization: true, includeDefinition: true, includeItem: true })
                    .pipe(
                        map((advertisement) => loadAdvertisementSuccess({ advertisement })),
                        catchError((error: HttpErrorResponse) =>
                            of(loadAdvertisementError({ error: error.error ?? error.message }))
                        )
                    )
            )
        )
    );
    // loadItem$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadItem),
    //         switchMap(({ id }) =>
    //             this.itemService.get(id, { includeCategory: true }).pipe(
    //                 map((item) => loadItemSuccess({ item })),
    //                 catchError((error: HttpErrorResponse) => of(loadItemError({ error: error.error ?? error.message })))
    //             )
    //         )
    //     )
    // );

    // loadItems$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadItems),
    //         switchMap(() => this.authStore.user$),
    //         tap(this.checkUserLoggedIn),
    //         filter((user): user is User => user !== null),
    //         switchMap((user) =>
    //             this.itemService.getByUser(user.id).pipe(
    //                 map((items) => loadItemsSuccess({ items: items })),
    //                 catchError((error: HttpErrorResponse) => of(loadItemsError({ error: error.error ?? error.message })))
    //             )
    //         )
    //     )
    // );

    // loadImages$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadItemSuccess),
    //         mergeMap(({ item }) =>
    //             this.itemService.getImagesByItem(item.id).pipe(
    //                 map((images) => loadImagesSuccess({ images: images })),
    //                 catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
    //             )
    //         )
    //     )
    // );

    loadLocalizations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLocalizations),
            switchMap(() => this.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is User => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    map((localizations) => loadLocalizationsSuccess({ localizations: localizations })),
                    catchError((error: HttpErrorResponse) => of(loadLocalizationsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadDefinitions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDefinitions),
            switchMap(() =>
                this.advertisementDefinitionService.getMany().pipe(
                    map((definitions) => loadDefinitionsSuccess({ definitions: definitions })),
                    catchError((error: HttpErrorResponse) => of(loadDefinitionsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    createAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createAdvertisement),
            switchMap(({ advertisement }) =>
                this.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is User => user !== null),
                    switchMap((user) => this.advertisementService.create(advertisement, user.id)),
                    map((id) => createAdvertisementSuccess({ advertisement: { ...advertisement, id: id } })),
                    catchError((error: HttpErrorResponse) =>
                        of(createAdvertisementError({ error: error.error ?? error.message }))
                    )
                )
            )
        )
    );

    updateAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAdvertisement),
            switchMap(({ id, advertisement }) =>
                this.advertisementService.update(id, advertisement).pipe(
                    map((id) => updateAdvertisementSuccess({ advertisement: { ...advertisement, id: id } })),
                    catchError((error: HttpErrorResponse) =>
                        of(updateAdvertisementError({ error: error.error ?? error.message }))
                    )
                )
            )
        )
    );

    private checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
}
