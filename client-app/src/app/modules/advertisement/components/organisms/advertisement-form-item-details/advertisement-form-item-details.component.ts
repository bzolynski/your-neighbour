import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/modules/core/models';

export interface IItemDetailsFormValues {
    name: string;
    categoryId: number;
    description: string;
}
export class ItemDetailsFormGroup extends FormGroup {
    value!: IItemDetailsFormValues;
    constructor(controls: { name: FormControl; categoryId: FormControl; description: FormControl }) {
        super(controls);
    }
}

@Component({
    selector: 'app-advertisement-form-item-details',
    templateUrl: './advertisement-form-item-details.component.html',
    styleUrls: ['./advertisement-form-item-details.component.scss'],
})
export class AdvertisementFormItemDetailsComponent implements OnInit {
    @Input() formGroup!: ItemDetailsFormGroup;
    @Input() categories!: ICategory[];

    get nameErrorMessage() {
        const nameControl = this.formGroup.controls['name'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        if (nameControl.errors?.minlength) return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        return '';
    }
    get categoryIdErrorMessage() {
        const nameControl = this.formGroup.controls['categoryId'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get descriptionErrorMessage() {
        const nameControl = this.formGroup.controls['description'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    ngOnInit(): void {
        if (!this.formGroup) throw new Error('Provide form group!');
        if (!this.categories) throw new Error('Provide categories to select!');
    }
}
