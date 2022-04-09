import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/modules/core/models';
import { IItemDetails } from 'src/app/modules/core/models/item.model';

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
export class AdvertisementFormItemDetailsComponent implements OnInit, OnChanges {
    @Input() itemDetails: IItemDetails | null = null;
    @Input() detailsFormGroup!: ItemDetailsFormGroup;
    @Input() categories!: ICategory[];

    get nameErrorMessage() {
        const nameControl = this.detailsFormGroup.controls['name'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        if (nameControl.errors?.minlength) return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        return '';
    }
    get categoryIdErrorMessage() {
        const nameControl = this.detailsFormGroup.controls['categoryId'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get descriptionErrorMessage() {
        const nameControl = this.detailsFormGroup.controls['description'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    ngOnInit(): void {
        if (!this.detailsFormGroup) throw new Error('Provide form group!');
        if (!this.categories) throw new Error('Provide categories to select!');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemDetails && changes.itemDetails.currentValue) {
            const itemDetails = changes.itemDetails.currentValue as IItemDetails;
            console.log(itemDetails);

            const formValues: IItemDetailsFormValues = {
                categoryId: itemDetails.category.id,
                description: itemDetails.description,
                name: itemDetails.name,
            };
            this.detailsFormGroup.setValue(formValues);
        }
    }
}
