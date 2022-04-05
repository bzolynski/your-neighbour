import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';

export class ItemFormGroup extends FormGroup {
    value!: {
        name: string;
        categoryId: number;
        description: string;
        save: boolean;
    };
    constructor(controls: { name: FormControl; categoryId: FormControl; description: FormControl; save: FormControl }) {
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

    constructor(private categoryService: CategoryService) {}
    ngOnInit(): void {
        this.categories$ = this.categoryService.getAll().pipe(map((resp) => resp.responseObject));
    }
}
