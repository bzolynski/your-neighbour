import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { AdvertisementDefinition, IItem, IItemListing, Localization } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';
import { AdvertisementAddStore } from '../../data-access';

@Component({
    selector: 'app-advertisement-add',
    templateUrl: './advertisement-add.component.html',
    styleUrls: ['./advertisement-add.component.scss'],
    providers: [AdvertisementAddStore],
})
export class AdvertisementAddComponent implements OnInit {
    itemSelectPanelOpen: boolean = false;
    form: FormGroup = new FormGroup({
        itemId: new GenericFormControl<number>(undefined, [Validators.required]),
        localizationId: new GenericFormControl<number>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definitionId: new GenericFormControl<number>(undefined, [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
    });
    // observables
    itemsListing$!: Observable<IItemListing[]>;
    userLocalizations$: Observable<Localization[]> = this.advertisementAddStore.userLocalizations$;
    advertisementDefinitions$: Observable<AdvertisementDefinition[]> = this.advertisementAddStore.advertisementDefinitions$;

    selectedItem$ = new BehaviorSubject<IItem | undefined>(undefined);
    itemLoading$ = new BehaviorSubject<boolean>(false);
    selectedLocalization$ = new BehaviorSubject<Localization | undefined>(undefined);
    description$ = new BehaviorSubject<string | undefined>(undefined);

    /*************************/
    categories$ = this.categoryService.getAll().pipe(map((x) => x.responseObject));
    /*************************/

    get descriptionErrorMessage() {
        const control = this.form.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(
        public dialog: MatDialog,
        private itemService: ItemService,
        private authenticationStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router,
        private advertisementAddStore: AdvertisementAddStore,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.advertisementAddStore.loadUserLocalizations();
        this.advertisementAddStore.loadAdvertisementDefinitions();
        this.authenticationStore.user$.subscribe((resp) => {
            if (resp == null) {
                this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
                this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                throwError(new Error('User is not logged in'));
            } else {
                this.itemsListing$ = this.itemService.getByUser(resp.id).pipe(map((resp) => resp.responseObject));
            }
        });
        this.advertisementAddStore.itemIdChanged(
            this.form.controls['itemId'].valueChanges.pipe(
                tap(() => {
                    this.itemLoading$.next(true);
                    this.selectedItem$.next(undefined);
                }),
                map((itemId) => +itemId),
                mergeMap((itemId) =>
                    this.itemService.get(itemId, { includeCategory: true, includeImages: true, maxImages: 1 }).pipe(
                        map((response) => response.responseObject),
                        tap(
                            (item) => {
                                this.itemLoading$.next(false);
                                this.selectedItem$.next(item);
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
                tap((description) => this.description$.next(description))
            )
        );
    }
    localizationFormSubmited = (form: FormGroup) => {
        if (form.valid) {
            const localization: Localization = { ...form.value };
            console.log(localization);
            this.dialog.closeAll();
        }
    };
    itemFormSubmited = (form: FormGroup) => {
        if (form.valid) {
            const item: IItem = { ...form.value };
            console.log(item);
            this.dialog.closeAll();
        }
    };
    onSubmit = () => {
        if (this.form.valid) {
            this.advertisementAddStore.createAdvertisement(this.form.value);
        }
    };
}
