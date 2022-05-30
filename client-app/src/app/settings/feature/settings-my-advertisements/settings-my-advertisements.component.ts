import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    changeListViewType,
    deleteAdvertisement,
    loadAdvertisements,
    loadImages,
    selectAdvertisements,
    selectError,
    selectListViewType,
} from '../../data-access/store/settings-my-advertisements';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
    advertisements$: Observable<Advertisement[] | null> = this.store.select(selectAdvertisements);
    selectedListViewType$: Observable<ListViewType> = this.store.select(selectListViewType);
    deleteAdvertisement$: ReplaySubject<number> = new ReplaySubject<number>(1);
    error$: Observable<string | null> = this.store.select(selectError);
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private destroy$: DestroyObservable
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadAdvertisements());
        this.deleteAdvertisement$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((id) =>
                    this.messageService.showConfirmationDialog('Czy na pewno chcesz usunąć to ogłoszenie?').pipe(
                        filter(({ result }) => result),
                        tap(() => {
                            this.store.dispatch(deleteAdvertisement({ id }));
                        })
                    )
                )
            )
            .subscribe();
        this.error$
            .pipe(
                takeUntil(this.destroy$),
                filter((error): error is string => error !== null),
                tap((error) => this.messageService.showMessage(error, 'error'))
            )
            .subscribe();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.store.dispatch(changeListViewType({ listViewType }));
    };
    loadImages = (advertisement: Advertisement) => {
        this.store.dispatch(loadImages({ itemId: advertisement.item.id }));
    };
    openAdvertisementForm = () => {
        this.router.navigate(['add'], {
            relativeTo: this.route,
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
        });
    };
}
