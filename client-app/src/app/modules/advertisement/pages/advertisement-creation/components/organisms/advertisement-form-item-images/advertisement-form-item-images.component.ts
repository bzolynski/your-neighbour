import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { IImage } from 'src/app/modules/core/models/image.model';
import { addItemImage } from '../../../../../pages/advertisement-creation/store/item-images/item-images.action';
import {
    selectItemImages,
    selectItemImagesIsBusy,
} from '../../../../../pages/advertisement-creation/store/item-images/item-images.selectors';

export class ImagesFormControl extends FormControl {
    value!: IImage[];
    constructor(
        formState?: IImage[] | [],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(formState, validatorOrOpts, asyncValidator);
    }
}

export interface Test<T> {
    value: T;
    error: any;
    liading: boolean;
}

@Component({
    selector: 'app-advertisement-form-item-images',
    templateUrl: './advertisement-form-item-images.component.html',
    styleUrls: ['./advertisement-form-item-images.component.scss'],
})
export class AdvertisementFormItemImagesComponent implements OnInit {
    @Input() imagesControl!: ImagesFormControl;
    images$ = this.store.select(selectItemImages).pipe(tap((resp) => this.setUpForm(resp)));
    isBusy$ = this.store.select(selectItemImagesIsBusy);

    constructor(private store: Store) {}
    ngOnInit(): void {
        if (!this.imagesControl) throw new Error('Provide control for images!');
    }
    handleFileChange = (input: HTMLInputElement) => {
        if (input.files) {
            for (const file of input.files) {
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    const reader = new FileReader();
                    reader.addEventListener(
                        'load',
                        (e) => {
                            if (e.target?.result) {
                                const image: IImage = { name: file.name, dataUrl: e.target.result.toString() };
                                this.addItemImage(image);
                            }
                        },
                        false
                    );
                    reader.readAsDataURL(file);
                }
            }
        }
        console.log(this.imagesControl.value);
    };

    addItemImage = (image: IImage) => {
        this.imagesControl.patchValue([...this.imagesControl.value, image]);
        this.store.dispatch(addItemImage({ image }));
    };

    setUpForm = (images: IImage[]) => {
        this.imagesControl.setValue([...images]);
    };
}
