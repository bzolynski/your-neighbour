import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    loadDefinition,
    selectDefinition,
    selectDeleted,
    selectError,
    selectStatus,
    resetState,
    deleteDefinition,
} from '../../data-access/store/settings-category-definitions-details';

@Component({
    selector: 'app-settings-category-definitions-details',
    templateUrl: './settings-category-definitions-details.component.html',
    styleUrls: ['./settings-category-definitions-details.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsCategoryDefinitionsDetailsComponent implements OnInit {
    definition$ = this.store.select(selectDefinition).pipe();
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
                tap((id) => this.store.dispatch(loadDefinition({ id: id })))
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
                tap((error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }))
            )
            .subscribe();
    }
    deleteDefinition = (id: number) => this.store.dispatch(deleteDefinition({ id: id }));
}
