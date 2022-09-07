import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
    createAdvertisement,
    deleteAdvertisement,
    loadAdvertisements,
    loadImages,
    selectAdvertisements,
    selectError,
} from '../../data-access/store/settings-my-advertisements';
import { map, tap } from 'rxjs/operators';
import { Advertisement } from '@models/';
import { FormGroup } from '@angular/forms';
import { AdvertisementFormComponent } from '../../ui/advertisement-form/advertisement-form.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
    @ViewChild(AdvertisementFormComponent) advertisementFormComponent?: AdvertisementFormComponent;
    #advertisements$: Observable<Advertisement[] | null> = this.store.select(selectAdvertisements);
    #error$: Observable<string | null> = this.store.select(selectError).pipe(
        tap((error) => {
            if (error !== null) this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        })
    );
    vm$ = combineLatest([this.#advertisements$, this.#error$]).pipe(
        map(([advertisements, error]) => ({ advertisements, error }))
    );
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadAdvertisements());
    }

    loadImages = (advertisement: Advertisement) => {
        this.store.dispatch(loadImages({ advertisementId: advertisement.id }));
    };

    advertisementDialog: boolean = false;

    advertisements: Advertisement[] = [];

    advertisement?: Advertisement;

    selectedAdvertisement: Advertisement[] | null = null;

    submitted: boolean = false;

    deleteSelectedAdvertisements() {
        this.confirmationService.confirm({
            message: 'Czy na pewno chcesz usunąć zaznaczone ogloszenia?',
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedAdvertisement = null;
                // TODO: store dispatch delete many
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Uwaga',
                    detail: 'Jeszcze nie zaimplementowano tej funkcji',
                    life: 3000,
                });
            },
        });
    }

    deleteAdvertisement(advertisement: Advertisement) {
        this.confirmationService.confirm({
            message: 'Czy na pewno chcesz usunąć ogłoszenie: ' + advertisement.title + '?',
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.advertisement = {} as Advertisement; ???
                this.store.dispatch(deleteAdvertisement({ id: advertisement.id }));
            },
        });
    }
    show() {
        this.dialogService.open(AdvertisementFormComponent, {
            header: 'Nowe ogłoszenie',
            baseZIndex: 10000,
        });
    }

    editProduct(advertisement: Advertisement) {
        this.advertisement = { ...advertisement };
        this.advertisementDialog = true;
    }

    hideDialog() {
        this.advertisementDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.advertisementDialog = false;
        this.advertisement = {} as Advertisement;
    }

    submitForm() {}

    formSubmited(form: FormGroup) {
        /*
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        category: new GenericFormControl<Category>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        images: new GenericFormControl<Image[]>([], [Validators.required]),

                public string Title { get; set; }
        public string Description { get; set; }
        public int DefinitionId { get; set; }
        public int LocalizationId { get; set; }
        public int CategoryId { get; set; }

        */
        if (form.valid) {
            this.store.dispatch(
                createAdvertisement({
                    advertisement: {
                        title: form.value['title'],
                        description: form.value['description'],
                        categoryId: form.value['category'].id,
                        definitionId: form.value['definition'].id,
                        localizationId: form.value['localization'].id,
                    } as Advertisement,
                })
            );
        }
    }
}
