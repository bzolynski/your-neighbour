import { Component, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IImage } from 'src/app/modules/core/models/image.model';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';
import { ICategory } from '../../data-access/models';
import { InputUtils } from '../../utils/input-utils';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnDestroy {
    @Output() formSubmited = new Subject<FormGroup>();
    @Output() canceled = new Subject();
    @Input() categories: ICategory[] | null = [];

    private destroy$ = new Subject<boolean>();

    itemForm = new GenericFormGroup({
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        categoryId: new GenericFormControl<number>(undefined, [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        images: new GenericFormControl<IImage[]>([], [Validators.required]),
    });

    get nameErrorMessage() {
        const control = this.itemForm.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        return '';
    }
    get categoryIdErrorMessage() {
        const control = this.itemForm.controls['categoryId'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get descriptionErrorMessage() {
        const control = this.itemForm.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    handleImageChange = (files: File[]) => {
        console.log(files);
        InputUtils.fileToImage$(files)
            .pipe(takeUntil(this.destroy$))
            .subscribe((item) => {
                this.itemForm.patchValue({ images: [...(this.itemForm.controls['images'].value ?? []), item] });
            });
    };

    handleImageDeleteButtonClick = (image: IImage) => {
        this.itemForm.patchValue({
            images: [...(this.itemForm.controls['images'].value.filter((x: IImage) => x != image) ?? [])],
        });
    };

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
