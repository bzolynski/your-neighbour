import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { addInfoBarMessage } from 'src/app/data-access/info-bar/info-bar.actions';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { GenericStoreStatus, IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    changeListViewType,
    deleteItem,
    loadImages,
    loadItems,
    selectError,
    selectItems,
    selectListViewType,
    selectStatus,
} from '../../data-access/store/settings-my-items';

@Component({
    selector: 'app-settings-my-items',
    templateUrl: './settings-my-items.component.html',
    styleUrls: ['./settings-my-items.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsMyItemsComponent implements OnInit {
    selectedListViewType$: Observable<ListViewType> = this.store.select(selectListViewType);
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    error$: Observable<string | null> = this.store.select(selectError);
    status$: Observable<GenericStoreStatus> = this.store.select(selectStatus);

    filteredItems$ = this.filter$
        .asObservable()
        .pipe(
            switchMap((search) =>
                this.store
                    .select(selectItems)
                    .pipe(map((items) => items?.filter((value) => value.name.toUpperCase().includes(search.toUpperCase()))))
            )
        );
    deleteItem$: ReplaySubject<number> = new ReplaySubject<number>(1);

    constructor(private store: Store, private messageService: MessageService, private destroy$: DestroyObservable) {}

    ngOnInit(): void {
        this.store.dispatch(loadItems());
        this.deleteItem$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((id) =>
                    this.messageService.showConfirmationDialog('Czy na pewno chcesz usunąć to ogłoszenie?').pipe(
                        filter(({ result }) => result),
                        tap(() => {
                            this.store.dispatch(deleteItem({ id }));
                        })
                    )
                )
            )
            .subscribe();
        this.error$
            .pipe(
                takeUntil(this.destroy$),
                filter((error): error is string => error !== null),
                tap((error) => this.store.dispatch(addInfoBarMessage({ message: error, messageType: 'error' })))
            )
            .subscribe();
    }
    changeListViewType = (listViewType: ListViewType) => {
        this.store.dispatch(changeListViewType({ listViewType }));
    };

    loadImages = (item: IItem) => {
        this.store.dispatch(loadImages({ itemId: item.id }));
    };
}
