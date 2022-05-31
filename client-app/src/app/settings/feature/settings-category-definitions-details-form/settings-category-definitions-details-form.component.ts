import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CategoryDefinitionAsyncValidators } from 'src/app/modules/settings/validators/category-definition-validators';
import { ICategoryDefinition } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    selectDefinition,
    selectError,
    selectStatus,
    loadDefinition,
    resetState,
    updateDefinition,
    createDefinition,
} from '../../data-access/store/settings-category-definitions-form';

@Component({
    selector: 'app-settings-category-definitions-details-form',
    templateUrl: './settings-category-definitions-details-form.component.html',
    styleUrls: ['./settings-category-definitions-details-form.component.scss'],
    providers: [DestroyObservable, CategoryDefinitionAsyncValidators],
})
export class SettingsCategoryDefinitionsDetailsFormComponent implements OnInit {
    form: FormGroup = new FormGroup({
        name: new GenericFormControl<string>(
            '',
            [Validators.required, Validators.minLength(3)],
            [this.categoryDefinitionAsyncValidators.checkNameExists()]
        ),
        displayName: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        isActive: new GenericFormControl<boolean>(true),
    });
    get displayNameErrorMessage(): string {
        const control = this.form.controls['displayName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        if (control.errors?.usernameExists) return 'Nazwa zajęta';
        return '';
    }
    get nameErrorMessage(): string {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        if (control.errors?.usernameExists) return 'Nazwa zajęta';
        return '';
    }

    definition$ = this.store.select(selectDefinition);
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
        private destroy$: DestroyObservable,
        private categoryDefinitionAsyncValidators: CategoryDefinitionAsyncValidators
    ) {}

    ngOnInit(): void {
        this.store.dispatch(resetState());
        this.id$
            .pipe(
                takeUntil(this.destroy$),
                filter((id): id is number => id !== null),
                tap((id) => this.store.dispatch(loadDefinition({ id: id })))
            )
            .subscribe();
        this.definition$
            .pipe(
                takeUntil(this.destroy$),
                tap((definition) => {
                    if (definition) {
                        this.form.patchValue({
                            name: definition.name,
                            displayName: definition.displayName,
                            isActive: definition.isActive,
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
                    if (id)
                        this.store.dispatch(
                            updateDefinition({ id: id, definiton: { ...this.form.value } as ICategoryDefinition })
                        );
                    else this.store.dispatch(createDefinition({ definiton: { ...this.form.value } as ICategoryDefinition }));
                })
            )
            .subscribe();
    }
}
