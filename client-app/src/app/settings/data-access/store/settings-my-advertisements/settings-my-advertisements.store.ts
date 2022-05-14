import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from 'src/app/advertisements/data-access';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { GenericState, IUser } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyAdvertisementsState extends GenericState<Advertisement[]> {
    listViewType: ListViewType;
}

@Injectable()
export class SettingsMyAdvertisementsStore extends ComponentStore<SettingsMyAdvertisementsState> {
    readonly advertisements$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status == 'loading');
    readonly error$ = this.select((state) => state.error);
    readonly listViewType$ = this.select((state) => state.listViewType);

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.advertisementService.delete(id).pipe(
                    tapResponse(
                        () => this.deleteAdvertisement(id),
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly update = this.effect<{ id: number; advertisement: Advertisement }>((params$) =>
        params$.pipe(
            switchMap((params) => this.advertisementService.update(params.id, params.advertisement)),
            switchMap((response) => this.advertisementService.get(response)),
            tapResponse(
                (response) => this.updateAdvertisement(response),
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly create = this.effect<Advertisement>((params$) =>
        params$.pipe(
            switchMap((advertisement) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.advertisementService
                            .create(advertisement, user.id)
                            .pipe(switchMap((response) => this.advertisementService.get(response)))
                    )
                )
            ),
            tapResponse(
                (response) => {
                    this.addAdvertisement(response);
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly loadAdvertisements = this.effect(($) =>
        $.pipe(
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.advertisementService
                    .getManyByUser(user.id, {
                        includeCategory: true,
                        includeDefinition: true,
                        includeImages: true,
                        maxImages: 1,
                        includeLocalization: true,
                    })
                    .pipe(
                        tapResponse(
                            (response) => this.patchState({ data: response }),
                            (error: HttpErrorResponse) => this.handleError(error)
                        )
                    )
            )
        )
    );
    private readonly addAdvertisement = this.updater((state, advertisement: Advertisement) => {
        return { ...state, data: [...(state.data ?? []), advertisement] };
    });
    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.message);
    };
    private readonly deleteAdvertisement = this.updater((state, id: number) => {
        const advertisement = (state.data ?? []).filter((x) => x.id !== id);
        return {
            ...state,
            data: [...advertisement],
        };
    });
    private readonly updateAdvertisement = this.updater((state, advertisement: Advertisement) => {
        const localizations = (state.data ?? []).filter((x) => x.id !== advertisement.id);
        return {
            ...state,
            data: [...localizations, advertisement],
        };
    });
    constructor(
        private advertisementService: AdvertisementService,
        private authStore: AuthenticationStore,
        private router: Router,
        private messageService: MessageService
    ) {
        super({ listViewType: 'list' } as SettingsMyAdvertisementsState);
    }
}
