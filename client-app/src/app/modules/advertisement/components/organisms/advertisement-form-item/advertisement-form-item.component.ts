import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemDetailsFormGroup } from '../../molecules';

export class ItemFormGroup extends FormGroup {
    value!: {
        details: ItemDetailsFormGroup;
        images: Byte[];
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

    @Input() formGroup!: ItemFormGroup;

    get itemDetailsFormGroup(): ItemDetailsFormGroup {
        return this.formGroup.get('details') as ItemDetailsFormGroup;
    }

    get imagesFormControl(): FormControl {
        return this.formGroup.get('images') as FormControl;
    }

    constructor(private categoryService: CategoryService) {}
    ngOnInit(): void {
        this.categories$ = this.categoryService.getAll().pipe(map((resp) => resp.responseObject));
    }
}
