import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { ItemCreateDto } from 'src/app/modules/core/dtos/item.dto';
import { IImage } from 'src/app/modules/core/models/image.model';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';
import { AuthenticationStore } from '../../authentication/data-access';
import { InputUtils } from '../../utils/input-utils';
import { ItemFormStore } from '../data-access/store/item-form.store';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss'],
    providers: [ItemFormStore],
})
export class ItemFormComponent implements OnInit {
    @Input()
    set itemId(value: number | null) {
        this.itemStore.loadItemDetails({ itemId: value });
        this.itemStore.loadItemImages({ itemId: value });
    }

    itemForm = new GenericFormGroup({
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        categoryId: new GenericFormControl<number>(undefined, [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        images: new GenericFormControl<IImage[]>([], [Validators.required]),
    });

    get nameErrorMessage() {
        const nameControl = this.itemForm.controls['name'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        if (nameControl.errors?.minlength) return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        return '';
    }
    get categoryIdErrorMessage() {
        const nameControl = this.itemForm.controls['categoryId'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get descriptionErrorMessage() {
        const nameControl = this.itemForm.controls['description'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    categories$ = this.itemStore.categories$;
    categoriesLoading$ = this.itemStore.categoriesLoading$;
    itemImages$ = this.itemStore.itemImages$.pipe(
        tap((images) => {
            this.itemForm.patchValue({
                images: images ?? [],
            });
        })
    );
    itemImagesLoading$ = this.itemStore.itemImagesLoading$;
    itemDetails$ = this.itemStore.itemDetails$.pipe(
        tap((details) => {
            this.itemForm.patchValue({
                name: details?.name ?? '',
                categoryId: details?.category.id ?? undefined,
                description: details?.description ?? '',
            });
        })
    );
    itemDetailsLoading$ = this.itemStore.itemDetailsLoading$;

    constructor(
        private itemStore: ItemFormStore,
        private authenticationStore: AuthenticationStore,

        private itemService: ItemService,
        private messageService: MessageService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.itemStore.loadCategories();
    }

    handleImageChange = (files: File[]) => {
        this.itemStore.addImage(InputUtils.fileToImage$(files));
    };

    handleImageDeleteButtonClick = (image: IImage) => {
        this.itemStore.removeImage(image);
    };

    handleSubmit = () => {
        console.log(this.itemForm.value);
        this.authenticationStore.user$
            .pipe(
                concatMap((resp) => {
                    if (resp == null) {
                        this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
                        this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                        return throwError(new Error('User is not logged in'));
                    } else {
                        console.log(this.itemForm.value.details);

                        const { name, description, categoryId, images } = this.itemForm.value;

                        const itemCreateDto = new ItemCreateDto(resp.id, name, description, categoryId, images);

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
