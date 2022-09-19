import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { deleteAdvertisement, loadAdvertisements, selectAdvertisements, selectError } from './store';
import { map, tap } from 'rxjs/operators';
import { Advertisement } from '@models/';
import { AdvertisementFormComponent } from '../../ui/advertisement-form/advertisement-form.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-settings-advertisements',
    templateUrl: './settings-advertisements.component.html',
    styleUrls: ['./settings-advertisements.component.scss'],
})
export class SettingsAdvertisementsComponent implements OnInit {
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

    selectedAdvertisement: Advertisement[] | null = null;
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

    createAdvertisement() {
        this.dialogService.open(AdvertisementFormComponent, {
            header: 'Nowe ogłoszenie',
            baseZIndex: 10000,
        });
    }

    editAdvertisement(advertisement: Advertisement) {
        this.dialogService.open(AdvertisementFormComponent, {
            header: 'Nowe ogłoszenie',
            baseZIndex: 10000,
            data: {
                id: advertisement.id,
            },
        });
    }
}
