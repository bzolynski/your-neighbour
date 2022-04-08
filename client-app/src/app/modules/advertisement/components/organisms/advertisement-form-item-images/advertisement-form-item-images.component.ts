import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { IImage } from 'src/app/modules/core/models/image.model';

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

@Component({
    selector: 'app-advertisement-form-item-images',
    templateUrl: './advertisement-form-item-images.component.html',
    styleUrls: ['./advertisement-form-item-images.component.scss'],
})
export class AdvertisementFormItemPhotosComponent implements OnInit {
    @Input() imagesControl!: ImagesFormControl;
    @ViewChild('previewContainer', { static: true }) previewContainer!: ElementRef<HTMLElement>;
    images: IImage[] = [] as IImage[];

    ngOnInit(): void {
        if (!this.imagesControl) throw new Error('Provide control for images!');
    }
    handleFileChange = (input: HTMLInputElement) => {
        this.imagesControl.reset([]);
        if (input.files) {
            for (const file of input.files) {
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    const reader = new FileReader();
                    reader.addEventListener(
                        'load',
                        (e) => {
                            if (e.target?.result) {
                                const image: IImage = { name: file.name, content: e.target.result.toString() };
                                this.imagesControl.patchValue([image, ...this.imagesControl.value]);

                                this.images.push(image);
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
}
