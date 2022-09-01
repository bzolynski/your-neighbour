import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CategoryDefinition, Localization, AdvertisementDefinition } from '@models/';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/modules/core/guards/can-deactivate.guard';
import { GenericStoreStatus } from '@utils/types';
import { IItem } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    loadDefinitions,
    loadItems,
    loadLocalizations,
    resetState,
    selectDefinitions,
    selectError,
    selectItems,
    selectLocalizations,
    selectSubmited,
    selectStatus,
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
    items$: Observable<IItem[]> = this.store.select(selectItems);
    localizations$: Observable<Localization[]> = this.store.select(selectLocalizations);
    definitions$: Observable<AdvertisementDefinition[]> = this.store.select(selectDefinitions);
    status$: Observable<GenericStoreStatus> = this.store.select(selectStatus);
    error$: Observable<string | null> = this.store.select(selectError);

    form: FormGroup = new FormGroup({
        item: new GenericFormControl<IItem>(undefined, [Validators.required]),
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
    });

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

    // edit$: Observable<boolean> = this.route.params.pipe(
    //     map((params) => {
    //         if (params['id']) this.store.dispatch(loadAdvertisement({ id: +params['id'] }));
    //         else
    //             this.store.dispatch(
    //                 setFormSnapshot({
    //                     formSnapshot: {
    //                         definition: undefined,
    //                         description: '',
    //                         item: undefined,
    //                         localization: undefined,
    //                         title: '',
    //                         dateCreated: new Date(),
    //                     } as AdvertisementForm,
    //                 })
    //             );
    //         return params['id'] ? true : false;
    //     })
    // );

    submitForm$ = new Subject();
    get definitionErrorMessage() {
        const control = this.form.controls['definition'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get itemErrorMessage() {
        const control = this.form.controls['item'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get localizationErrorMessage() {
        const control = this.form.controls['localization'];
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

    selectedItem: IItem | null = null;
    selectedLocalization: Localization | null = null;
    selectedDefinition: CategoryDefinition | null = null;
    onItemSelect(event: any) {
        console.log(this.form.value);
        this.form.patchValue({ item: event.data });
        console.log(this.form.value);

        this.messageService.add({ severity: 'info', summary: 'Wybrano produkt', detail: event.data.name });
    }
    onLocalizationSelect(event: any) {
        this.form.patchValue({ localization: event.data });
        this.messageService.add({ severity: 'info', summary: 'Wybrano lokalizację', detail: event.data.name });
    }

    constructor(
        private store: Store,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
        private router: Router,
        private destroy$: DestroyObservable
    ) {}
    ngOnInit(): void {
        this.store.dispatch(loadLocalizations());
        this.store.dispatch(loadItems());
        this.store.dispatch(loadDefinitions());
        this.form.valueChanges
            .pipe(
                tap((x) => {
                    console.log('change');
                    console.log(x);
                    console.log('change');
                })
            )
            .subscribe();
        // this.submitForm$
        //     .pipe(
        //         takeUntil(this.destroy$),
        //         tap(() => {
        //             this.form.markAllAsTouched();
        //             if (!this.form.valid) this.messageService.showMessage('Nie uzupełniono wszystkich wymaganych pól', 'error');
        //         }),
        //         filter(() => this.form.valid),
        //         switchMap(() => this.route.params),
        //         tap((params) =>
        //             params['id']
        //                 ? this.store.dispatch(updateAdvertisement({ id: +params['id'], advertisement: { ...this.form.value } }))
        //                 : this.store.dispatch(createAdvertisement({ advertisement: { ...this.form.value } }))
        //         )
        //     )
        //     .subscribe();
        this.submited$.pipe(takeUntil(this.destroy$)).subscribe();
    }
    canDeactivate = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        return new Observable<boolean>((subscriber) => {
            this.confirmationService.confirm({
                message: 'Czy na pewno chcesz usunąć ten przedmiot?',
                header: 'Czy na pewno?',
                icon: 'pi pi-info-circle',
                accept: () => subscriber.next(true),
                reject: () => subscriber.next(false),
            });
        });
    };
}
