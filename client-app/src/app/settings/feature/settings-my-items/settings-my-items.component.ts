import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { GenericStoreStatus, IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
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
})
export class SettingsMyItemsComponent implements OnInit, OnDestroy {
    selectedListViewType$: Observable<ListViewType> = this.store.select(selectListViewType);
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    error$: Observable<string | null> = this.store.select(selectError).pipe();
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

    destroy$ = new Subject<boolean>();
    constructor(private store: Store, private messageService: MessageService) {}

    ngOnInit(): void {
        this.store.dispatch(loadItems());
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.store.dispatch(changeListViewType({ listViewType }));
    };

    deleteItem = (id: number) => {
        this.messageService
            .showConfirmationDialog('Czy na pewno chcesz usunąć ten przedmiot?')
            .pipe(
                takeUntil(this.destroy$),
                filter(({ result }) => result),
                tap(() => {
                    this.store.dispatch(deleteItem({ id }));
                })
            )
            .subscribe();
    };

    loadImages = (item: IItem) => {
        this.store.dispatch(loadImages({ itemId: item.id }));
    };
}
