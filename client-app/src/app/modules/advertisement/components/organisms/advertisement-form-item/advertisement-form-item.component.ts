import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { ItemCreateDto } from 'src/app/modules/core/dtos/item.dto';
import { ICategory } from 'src/app/modules/core/models';
import { IImage } from 'src/app/modules/core/models/image.model';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {
    IItemDetailsFormValues,
    ItemDetailsFormGroup,
} from '../advertisement-form-item-details/advertisement-form-item-details.component';
import { ImagesFormControl } from '../advertisement-form-item-images/advertisement-form-item-images.component';

export class ItemFormGroup extends FormGroup {
    value!: {
        details: IItemDetailsFormValues;
        images: IImage[];
    };
    constructor(controls: { details: ItemDetailsFormGroup; images: FormControl }) {
        super(controls);
    }
}

@Component({
    selector: 'app-advertisement-form-item',
    templateUrl: './advertisement-form-item.component.html',
    styleUrls: ['./advertisement-form-item.component.scss'],
})
export class AdvertisementFormItemComponent implements OnInit {
    categories$!: Observable<ICategory[]>;

    itemForm: ItemFormGroup = new ItemFormGroup({
        details: new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            categoryId: new FormControl(null, [Validators.required]),
            description: new FormControl('', [Validators.required]),
        }),
        images: new ImagesFormControl([], [Validators.required]),
    });

    get itemDetailsFormGroup(): ItemDetailsFormGroup {
        return this.itemForm.get('details') as ItemDetailsFormGroup;
    }

    get imagesFormControl(): FormControl {
        return this.itemForm.get('images') as FormControl;
    }

    constructor(
        private categoryService: CategoryService,
        private itemService: ItemService,
        private authenticationService: AuthenticationService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.categories$ = this.categoryService.getAll().pipe(map((resp) => resp.responseObject));
    }

    handleSubmit = (form: HTMLFormElement) => {
        console.log('HANDLE XD');

        if (!this.authenticationService.currentUser) throw new Error('No logged in user!');

        const { name, description, categoryId } = this.itemForm.value.details;

        const itemCreateDto = new ItemCreateDto(this.authenticationService.currentUser.id, name, description, categoryId, [
            ...this.itemForm.value.images,
        ]);

        this.itemService.create(itemCreateDto).subscribe(
            (response) => {
                this.messageService.showMessage(response, 'success');
            },
            (error) => {
                console.log(error);
            }
        );
    };
}
