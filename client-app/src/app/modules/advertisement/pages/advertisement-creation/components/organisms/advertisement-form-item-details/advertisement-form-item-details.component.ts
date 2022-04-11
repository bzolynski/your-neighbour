import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { IItemDetails } from 'src/app/modules/core/models/item.model';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AdvertisementCreationState } from '../../../../../pages/advertisement-creation/store/advertisement-creation.state';
import {
    selectItemDetails,
    selectItemDetailsError,
    selectItemDetailsStatus,
} from '../../../../../pages/advertisement-creation/store/item-details/item-details.selectors';

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
    itemDetails$ = this.store.select(selectItemDetails).pipe(
        distinctUntilChanged((item1, item2) => item1?.id == item2?.id),
        tap((resp) => this.setUpForm(resp))
    );
    status$ = this.store.select(selectItemDetailsStatus);
    error$ = this.store.select(selectItemDetailsError).pipe(tap((resp) => this.messageService.showMessage(resp, 'error')));

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

    constructor(private store: Store<AdvertisementCreationState>, private messageService: MessageService) {}

    ngOnInit(): void {
        if (!this.detailsFormGroup) throw new Error('Provide form group!');
        if (!this.categories) throw new Error('Provide categories to select!');
    }

    setUpForm = (itemDetails: IItemDetails | null) => {
        console.log(itemDetails);
        if (itemDetails) {
            const formValues: IItemDetailsFormValues = {
                categoryId: itemDetails.category.id,
                description: itemDetails.description,
                name: itemDetails.name,
            };
            this.detailsFormGroup.setValue(formValues);
        } else this.detailsFormGroup.reset();
    };
}
