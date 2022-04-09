import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { ItemCreateDto } from 'src/app/modules/core/dtos/item.dto';
import { ICategory } from 'src/app/modules/core/models';
import { IImage } from 'src/app/modules/core/models/image.model';
import { IItemDetails } from 'src/app/modules/core/models/item.model';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {
    IItemDetailsFormValues,
    ItemDetailsFormGroup,
} from '../advertisement-form-item-details/advertisement-form-item-details.component';
import { ImagesFormControl } from '../advertisement-form-item-images/advertisement-form-item-images.component';

export interface IItemFormValues {
    details: IItemDetailsFormValues;
    images: IImage[];
}

export class ItemFormGroup extends FormGroup {
    value!: IItemFormValues;
    constructor(controls: { details: ItemDetailsFormGroup; images: FormControl }) {
        super(controls);
    }
}

@Component({
    selector: 'app-advertisement-form-item',
    templateUrl: './advertisement-form-item.component.html',
    styleUrls: ['./advertisement-form-item.component.scss'],
})
export class AdvertisementFormItemComponent implements OnInit, OnChanges {
    @Input() itemId: number | null = null;

    loadingImages$ = new BehaviorSubject(false);
    loadingDetails$ = new BehaviorSubject(false);
    images$!: Observable<IImage[]>;
    itemDetails$!: Observable<IItemDetails>;
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemId && changes.itemId.currentValue && changes.itemId.currentValue !== changes.itemId.previousValue) {
            const itemId: number = changes.itemId.currentValue as number;

            this.loadingImages$.next(true);
            this.images$ = this.itemService.getImagesByItem(itemId).pipe(
                tap(() => this.loadingImages$.next(false)),
                map((resp) => resp.responseObject)
            );

            this.loadingDetails$.next(true);
            this.itemDetails$ = this.itemService.getDetails(itemId).pipe(
                tap(() => this.loadingDetails$.next(false)),
                map((resp) => resp.responseObject)
            );
        }
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
                this.messageService.showMessage(response.responseObject, 'success');
            },
            (error) => {
                console.log(error);
            }
        );
    };
}
