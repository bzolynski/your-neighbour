import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, Observable, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/modules/core/guards/can-deactivate.guard';
import { Category } from '@models/';
import { GenericFormControl } from 'src/app/shared/utils';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    createCategory,
    loadCategory,
    loadDefinitions,
    resetState,
    selectCategory,
    selectDefinitions,
    selectError,
    selectStatus,
    updateCategory,
} from '../../data-access/store/settings-categories-form';

@Component({
    selector: 'app-settings-categories-form',
    templateUrl: './settings-categories-form.component.html',
    styleUrls: ['./settings-categories-form.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsCategoriesFormComponent implements OnInit, CanComponentDeactivate {
    form: FormGroup = new FormGroup({
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        definitionId: new GenericFormControl<number>(undefined, [Validators.required]),
        isActive: new GenericFormControl<boolean>(true),
    });

    get nameErrorMessage() {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        return '';
    }
    get definitionIdErrorMessage() {
        const control = this.form.controls['definitionId'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    category$ = this.store.select(selectCategory);
    definitions$ = this.store.select(selectDefinitions);
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);
    id$ = this.route.params.pipe(
        switchMap((params) => iif(() => params['id'] === null || isNaN(params['id']), of(null), of(+params['id'])))
    );
    submit$ = new Subject();
    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private destroy$: DestroyObservable
    ) {}

    ngOnInit(): void {
        this.store.dispatch(resetState());
        this.store.dispatch(loadDefinitions());
        this.id$
            .pipe(
                takeUntil(this.destroy$),
                filter((id): id is number => id !== null),
                tap((id) => this.store.dispatch(loadCategory({ id: id })))
            )
            .subscribe();
        this.category$
            .pipe(
                takeUntil(this.destroy$),
                tap((category) => {
                    if (category) {
                        this.form.patchValue({
                            name: category.name,
                            definitionId: category.definition.id,
                            isActive: category.isActive,
                        });
                    } else {
                        this.form.reset();
                    }
                })
            )
            .subscribe();
        this.submit$
            .asObservable()
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() => this.id$),
                tap((id) => {
                    if (id) this.store.dispatch(updateCategory({ id: id, category: { ...this.form.value } as Category }));
                    else this.store.dispatch(createCategory({ category: { ...this.form.value } as Category }));
                })
            )
            .subscribe();
    }

    canDeactivate = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        return true;
    };
}
