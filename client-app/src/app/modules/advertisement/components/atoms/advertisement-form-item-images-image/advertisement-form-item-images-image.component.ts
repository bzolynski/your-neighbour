import { Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/modules/core/models/image.model';

@Component({
    selector: 'app-advertisement-form-item-images-image',
    templateUrl: './advertisement-form-item-images-image.component.html',
    styleUrls: ['./advertisement-form-item-images-image.component.scss'],
})
export class AdvertisementFormItemImagesImageComponent implements OnInit {
    @Input() image!: IImage;

    ngOnInit(): void {
        if (!this.image) throw new Error('Provide image! [image]');
    }
}
