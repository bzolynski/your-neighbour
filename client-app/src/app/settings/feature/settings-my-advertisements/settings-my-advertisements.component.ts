import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
    deleteAdvertisement,
    loadAdvertisements,
    loadImages,
    selectAdvertisements,
    selectError,
} from '../../data-access/store/settings-my-advertisements';
import { map, tap } from 'rxjs/operators';
import { Advertisement } from '@models/';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
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
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadAdvertisements());
    }

    loadImages = (advertisement: Advertisement) => {
        this.store.dispatch(loadImages({ itemId: advertisement.item.id }));
    };

    advertisementDialog: boolean = false;

    advertisements: Advertisement[] = [];

    advertisement?: Advertisement;

    selectedAdvertisement: Advertisement[] | null = null;

    submitted: boolean = false;
    openNew() {
        this.advertisement = {} as Advertisement;
        this.submitted = false;
        this.advertisementDialog = true;
    }

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
}
