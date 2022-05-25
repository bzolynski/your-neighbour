import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { showInfoBar } from 'src/app/data-access/info-bar/info-bar.actions';
import { CanComponentDeactivate } from 'src/app/modules/core/guards/can-deactivate.guard';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { IItem, Localization, AdvertisementDefinition, GenericStoreStatus } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    createAdvertisement,
    loadAdvertisement,
    loadDefinitions,
    loadItems,
    loadLocalizations,
    resetState,
    selectDefinitions,
    selectError,
    selectFormSnapshot,
    selectItems,
    selectLocalizations,
    selectSubmited,
    selectStatus,
    setFormSnapshot,
    updateAdvertisement,
} from '../../data-access/store/settings-my-advertisements-form';

export interface AdvertisementForm {
    itemId?: number;
    localizationId?: number;
    dateCreated?: Date;
    definitionId?: number;
    title?: string;
    description?: string;
}

@Component({
    selector: 'app-settings-my-advertisements-form',
    templateUrl: './settings-my-advertisements-form.component.html',
    styleUrls: ['./settings-my-advertisements-form.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsMyAdvertisementsFormComponent implements OnInit, CanComponentDeactivate {
    form: FormGroup = new FormGroup({
        itemId: new GenericFormControl<number>(undefined, [Validators.required]),
        localizationId: new GenericFormControl<number>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definitionId: new GenericFormControl<number>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
    });
    items$: Observable<IItem[]> = this.store.select(selectItems);
    localizations$: Observable<Localization[]> = this.store.select(selectLocalizations);
    definitions$: Observable<AdvertisementDefinition[]> = this.store.select(selectDefinitions);
    status$: Observable<GenericStoreStatus> = this.store.select(selectStatus);
    error$: Observable<string | null> = this.store.select(selectError);
    submited$: Observable<boolean> = this.store.select(selectSubmited).pipe(
        filter((submited) => submited === true),
        switchMap(() => this.route.queryParams),
        map((params) => {
            this.form.markAsPristine();
            this.store.dispatch(resetState());
            if (params['returnUrl']) this.router.navigateByUrl(params['returnUrl']);
            else this.router.navigate(['/settings', 'my', 'advertisements']);
            return true;
        })
    );
    edit$: Observable<boolean> = this.route.params.pipe(
        map((params) => {
            if (params['id']) this.store.dispatch(loadAdvertisement({ id: +params['id'] }));
            else
                this.store.dispatch(
                    setFormSnapshot({
                        formSnapshot: {
                            definitionId: undefined,
                            description: '',
                            itemId: undefined,
                            localizationId: undefined,
                            title: '',
                            dateCreated: new Date(),
                        } as AdvertisementForm,
                    })
                );
            return params['id'] ? true : false;
        })
    );

    formSnapshot$ = this.store.select(selectFormSnapshot).pipe(
        filter((formSnapshot) => formSnapshot !== null && formSnapshot !== undefined),
        tap((formSnapshot) => {
            this.form.patchValue({ ...formSnapshot });
        })
    );
    submitForm$ = new Subject();
    get definitionErrorMessage() {
        const control = this.form.controls['definitionId'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get itemErrorMessage() {
        const control = this.form.controls['itemId'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get localizationErrorMessage() {
        const control = this.form.controls['localizationId'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get titleErrorMessage() {
        const control = this.form.controls['title'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    get descriptionErrorMessage() {
        const control = this.form.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(
        private store: Store,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private destroy$: DestroyObservable
    ) {}
    ngOnInit(): void {
        this.store.dispatch(loadLocalizations());
        this.store.dispatch(loadItems());
        this.store.dispatch(loadDefinitions());

        this.formSnapshot$.pipe(takeUntil(this.destroy$)).subscribe();
        this.submitForm$
            .pipe(
                takeUntil(this.destroy$),
                tap(() => {
                    this.form.markAllAsTouched();
                    if (!this.form.valid)
                        this.store.dispatch(
                            showInfoBar({ message: 'Nie uzupełniono wszystkich wymaganych pól', messageType: 'error' })
                        );
                }),
                filter(() => this.form.valid),
                switchMap(() => this.route.params),
                tap((params) =>
                    params['id']
                        ? this.store.dispatch(updateAdvertisement({ id: +params['id'], advertisement: { ...this.form.value } }))
                        : this.store.dispatch(createAdvertisement({ advertisement: { ...this.form.value } }))
                )
            )
            .subscribe();
        this.submited$.pipe(takeUntil(this.destroy$)).subscribe();
    }

    canDeactivate = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        return (
            this.form.pristine ||
            this.messageService
                .showConfirmationDialog('Niezapisane zmiany zostaną cofnięte. Czy chcesz opuścić stronę?')
                .pipe(map((x) => x.result))
        );
    };
}
