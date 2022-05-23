import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IItem, Localization, AdvertisementDefinition, GenericStoreStatus } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';
import {
    createAdvertisement,
    loadAdvertisement,
    loadDefinitions,
    loadItems,
    loadLocalizations,
    selectAdvertisement,
    selectDefinitions,
    selectError,
    selectItems,
    selectLocalizations,
    selectStatus,
} from '../../data-access/store/settings-my-advertisements-form';

@Component({
    selector: 'app-settings-my-advertisements-form',
    templateUrl: './settings-my-advertisements-form.component.html',
    styleUrls: ['./settings-my-advertisements-form.component.scss'],
})
export class SettingsMyAdvertisementsFormComponent implements OnInit, OnDestroy {
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
    destroy$ = new Subject<boolean>();

    get descriptionErrorMessage() {
        const control = this.form.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get titleErrorMessage() {
        const control = this.form.controls['title'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(public dialog: MatDialog, private store: Store, private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.store.dispatch(loadLocalizations());
        this.store.dispatch(loadItems());
        this.store.dispatch(loadDefinitions());
        this.store
            .select(selectAdvertisement)
            .pipe(
                takeUntil(this.destroy$),
                tap((advertisement) =>
                    this.form.patchValue({
                        itemId: advertisement?.item.id,
                        localizationId: advertisement?.localization.id,
                        categoryId: advertisement?.item.category.id,
                        description: advertisement?.item.description,
                        definitionId: advertisement?.definition.id,
                        title: advertisement?.title,
                    })
                )
            )
            .subscribe();
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                tap((params) => {
                    if (params['id']) this.store.dispatch(loadAdvertisement({ id: +params['id'] }));
                    return params['id'] ? true : false;
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onSubmit = () => {
        if (this.form.valid) {
            this.store.dispatch(createAdvertisement({ advertisement: { ...this.form.value } }));
        }
    };
}
