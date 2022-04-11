import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {
    selectItemImages,
    selectItemImagesError,
    selectItemImagesStatus,
} from '../../../../../pages/advertisement-creation/store/item-images/item-images.selectors';

@Component({
    selector: 'app-advertisement-form-item-selected-images',
    templateUrl: './advertisement-form-item-selected-images.component.html',
    styleUrls: ['./advertisement-form-item-selected-images.component.scss'],
})
export class AdvertisementFormItemSelectedImagesComponent {
    images$ = this.store.select(selectItemImages);
    status$ = this.store.select(selectItemImagesStatus);
    error$ = this.store.select(selectItemImagesError).pipe(tap((resp) => this.messageService.showMessage(resp, 'error')));

    constructor(private store: Store, private messageService: MessageService) {}
}
