import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import { loadCategory, selectCategory, selectError, selectStatus } from '../../data-access/store/settings-categories-details';

@Component({
    selector: 'app-settings-categories-details',
    templateUrl: './settings-categories-details.component.html',
    styleUrls: ['./settings-categories-details.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsCategoriesDetailsComponent implements OnInit {
    category$ = this.store.select(selectCategory);
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);

    constructor(private store: Store, private route: ActivatedRoute, private destroy$: DestroyObservable) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                map((params) => +params['id']),
                filter((id): id is number => id !== null),
                tap((id) => this.store.dispatch(loadCategory({ id: id })))
            )
            .subscribe();
    }
}
