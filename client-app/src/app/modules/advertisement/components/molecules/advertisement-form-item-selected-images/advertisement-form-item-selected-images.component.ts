import { Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/modules/core/models/image.model';
import { AdvertisementFormItemImagesComponent } from '../../organisms';

@Component({
    selector: 'app-advertisement-form-item-selected-images',
    templateUrl: './advertisement-form-item-selected-images.component.html',
    styleUrls: ['./advertisement-form-item-selected-images.component.scss'],
})
export class AdvertisementFormItemSelectedImagesComponent implements OnInit {
    @Input() imageInputContainer!: AdvertisementFormItemImagesComponent;
    @Input() images: IImage[] = [] as IImage[];

    ngOnInit(): void {
        if (!this.imageInputContainer) throw new Error('Provide reference to FormImageComponent');
    }
}
