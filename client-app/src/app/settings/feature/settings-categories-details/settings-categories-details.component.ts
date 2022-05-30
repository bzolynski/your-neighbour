import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    deleteCategory,
    loadCategory,
    resetState,
    selectCategory,
    selectDeleted,
    selectError,
    selectStatus,
} from '../../data-access/store/settings-categories-details';

@Component({
    selector: 'app-settings-categories-details',
    templateUrl: './settings-categories-details.component.html',
    styleUrls: ['./settings-categories-details.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsCategoriesDetailsComponent implements OnInit {
    category$ = this.store.select(selectCategory).pipe();
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);
    deleted$ = this.store.select(selectDeleted);
    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private destroy$: DestroyObservable,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                map((params) => +params['id']),
                filter((id): id is number => id !== null),
                tap((id) => this.store.dispatch(loadCategory({ id: id })))
            )
            .subscribe();

        this.deleted$
            .pipe(
                takeUntil(this.destroy$),
                filter((deleted) => deleted),
                tap(() => this.router.navigate(['../'], { relativeTo: this.route })),
                tap(() => this.store.dispatch(resetState()))
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

    deleteCategory = (id: number) => this.store.dispatch(deleteCategory({ id: id }));
}
