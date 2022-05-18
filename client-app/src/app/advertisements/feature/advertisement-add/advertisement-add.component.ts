import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { AdvertisementDefinition, ICategory, IItem, Localization } from 'src/app/shared/data-access/models';
import { CategoryStore, ItemsStore, LocalizationsStore } from 'src/app/shared/data-access/store';
import { GenericFormControl } from 'src/app/shared/utils';
import { AdvertisementAddStore } from '../../data-access';
import { Advertisement } from '../../data-access/models/advertisement.model';

@Component({
    selector: 'app-advertisement-add',
    templateUrl: './advertisement-add.component.html',
    styleUrls: ['./advertisement-add.component.scss'],
    providers: [AdvertisementAddStore, ItemsStore, CategoryStore, LocalizationsStore],
})
export class AdvertisementAddComponent implements OnInit {
    form: FormGroup = new FormGroup({
        itemId: new GenericFormControl<number>(undefined, [Validators.required]),
        localizationId: new GenericFormControl<number>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definitionId: new GenericFormControl<number>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
    });
    advertisement: Advertisement = {} as Advertisement;

    // observables
    categories$: Observable<ICategory[] | null> = this.categoryStore.categories$;
    itemsListing$: Observable<IItem[] | null> = this.itemStore.items$;
    userLocalizations$: Observable<Localization[] | null> = this.localizationStore.localizations$;
    advertisementDefinitions$: Observable<AdvertisementDefinition[]> = this.advertisementAddStore.advertisementDefinitions$;
    itemLoading$ = new BehaviorSubject<boolean>(false);

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

    constructor(
        public dialog: MatDialog,
        private itemService: ItemService,
        private advertisementAddStore: AdvertisementAddStore,
        private itemStore: ItemsStore,
        private categoryStore: CategoryStore,
        private localizationStore: LocalizationsStore
    ) {}

    ngOnInit(): void {
        this.categoryStore.loadCategories();
        this.localizationStore.loadForLoggedInUser();
        this.advertisementAddStore.loadAdvertisementDefinitions();
        this.itemStore.loadForLoggedInUser({});

        this.advertisementAddStore.itemIdChanged(
            this.form.controls['itemId'].valueChanges.pipe(
                tap(() => {
                    this.itemLoading$.next(true);
                    this.advertisement.item = undefined!;
                }),
                map((itemId) => +itemId),
                mergeMap((itemId) =>
                    this.itemService.get(itemId, { includeCategory: true, includeImages: true, maxImages: 1 }).pipe(
                        tap(
                            (item) => {
                                this.itemLoading$.next(false);
                                this.advertisement.item = item;
                            },
                            (error) => this.itemLoading$.next(false)
                        )
                    )
                )
            )
        );

        this.advertisementAddStore.descriptionChanged(
            this.form.controls['description'].valueChanges.pipe(
                map((description) => <string>description),
                tap((description) => {
                    this.advertisement.description = description;
                })
            )
        );

        this.advertisementAddStore.titleChanged(
            this.form.controls['title'].valueChanges.pipe(
                map((title) => <string>title),
                tap((title) => {
                    this.advertisement.title = title;
                })
            )
        );
    }

    assignLocalization = (localization: Localization) => {
        this.advertisement.localization = localization;
    };

    localizationFormSubmited = (form: FormGroup) => {
        if (form.valid) {
            const localization: Localization = { ...form.value };
            this.localizationStore.create(localization);
            this.dialog.closeAll();
        }
    };
    itemFormSubmited = (form: FormGroup) => {
        if (form.valid) {
            const item: IItem = { ...form.value };
            this.itemStore.create(item);
            this.dialog.closeAll();
        }
    };
    onSubmit = () => {
        if (this.form.valid) {
            this.advertisementAddStore.createAdvertisement(this.form.value);
        }
    };
}
