import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-advertisement-form-item-photos',
    templateUrl: './advertisement-form-item-photos.component.html',
    styleUrls: ['./advertisement-form-item-photos.component.scss'],
})
export class AdvertisementFormItemPhotosComponent implements OnInit {
    @Input() imagesControl!: FormControl;

    ngOnInit(): void {
        if (!this.imagesControl) throw new Error('Provide control for images!');
    }
}
