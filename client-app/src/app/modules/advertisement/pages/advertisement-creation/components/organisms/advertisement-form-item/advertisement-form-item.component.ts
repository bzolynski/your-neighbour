import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { ItemCreateDto } from 'src/app/modules/core/dtos/item.dto';
import { ICategory } from 'src/app/modules/core/models';
import { IImage } from 'src/app/modules/core/models/image.model';
import { IItemDetails } from 'src/app/modules/core/models/item.model';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { loadItemDetails } from '../../../../../pages/advertisement-creation/store/item-details/item-details.action';
import { loadItemImages } from '../../../../../pages/advertisement-creation/store/item-images/item-images.action';
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

    images$!: Observable<IImage[]>;
    itemDetails$!: Observable<IItemDetails>;
    categories$!: Observable<ICategory[]>;
    user$ = this.store.select(selectUser);

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
        private messageService: MessageService,
        private store: Store,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categories$ = this.categoryService.getAll().pipe(map((resp) => resp.responseObject));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemId && changes.itemId.currentValue && changes.itemId.currentValue !== changes.itemId.previousValue) {
            const itemId: number = changes.itemId.currentValue as number;

            this.store.dispatch(loadItemDetails({ id: itemId }));
            this.store.dispatch(loadItemImages({ id: itemId }));
        }
    }

    handleSubmit = () => {
        this.user$
            .pipe(
                concatMap((resp) => {
                    if (resp == null) {
                        this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
                        this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                        return throwError(new Error('User is not logged in'));
                    } else {
                        const { name, description, categoryId } = this.itemForm.value.details;

                        const itemCreateDto = new ItemCreateDto(resp.id, name, description, categoryId, [
                            ...this.itemForm.value.images,
                        ]);

                        return this.itemService.create(itemCreateDto);
                    }
                })
            )
            .subscribe(
                (response) => {
                    this.messageService.showMessage(response.responseObject, 'success');
                },
                (error) => {
                    console.log(error);
                }
            );
    };
}
