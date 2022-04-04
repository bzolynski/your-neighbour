import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit, OnDestroy {
    itemSelectPanelOpen: boolean = false;
    categories: Array<ICategory> = [] as Array<ICategory>;
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        categoryId: new FormControl(null, [Validators.required]),
        description: new FormControl('', [Validators.required]),
        saveItem: new FormControl(true),
    });

    get nameErrorMessage() {
        const nameControl = this.form.controls['name'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        if (nameControl.errors?.minlength) return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        return '';
    }
    get categoryIdErrorMessage() {
        const nameControl = this.form.controls['categoryId'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get descriptionErrorMessage() {
        const nameControl = this.form.controls['description'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    // Private members
    unsubscriber$: Subject<boolean> = new Subject();

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService
            .getAll()
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe((response) => {
                this.categories = response.responseObject;
            });
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }

    onSubmit = () => {
        console.log(this.categories);
    };
}
