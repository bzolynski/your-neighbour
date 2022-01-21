import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategoryDefinition } from 'src/app/modules/core/models';
import { CategoryDefinitionsService } from 'src/app/modules/core/services/';
import { CategoryDefinitionAsyncValidators } from '../../../validators/category-definition-validators';

@Component({
    selector: 'app-category-definition-form',
    templateUrl: './category-definition-form.component.html',
    styleUrls: ['./category-definition-form.component.scss'],
})
export class CategoryDefinitionFormComponent implements OnInit, OnDestroy {
    // Public properties
    editMode: boolean = false;
    loading: boolean = false;
    categoryDefinition: ICategoryDefinition = {} as ICategoryDefinition;
    form: FormGroup = new FormGroup({
        name: new FormControl(
            '',
            [Validators.required, Validators.minLength(3)],
            [
                CategoryDefinitionAsyncValidators.checkNameExists(
                    this.categoryDefinition,
                    this.categoryDefinitionsService
                ),
            ]
        ),
        displayName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        isActive: new FormControl(true),
    });

    get displayNameErrorMessage(): string {
        const displayNameControl = this.form.controls['displayName'];
        if (displayNameControl.errors?.required) return 'Pole jest wymagane';
        if (displayNameControl.errors?.minlength)
            return `Minimalna długość: ${displayNameControl.errors?.minlength?.requiredLength}`;
        if (displayNameControl.errors?.usernameExists) return 'Nazwa zajęta';
        return '';
    }
    get nameErrorMessage(): string {
        const nameControl = this.form.controls['name'];
        if (nameControl.errors?.required) return 'Pole jest wymagane';
        if (nameControl.errors?.minlength)
            return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        if (nameControl.errors?.usernameExists) return 'Nazwa zajęta';
        return '';
    }
    get test(): FormControl {
        return this.form.controls['isActive'] as FormControl;
    }
    // Private members
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private categoryDefinitionsService: CategoryDefinitionsService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                const id: number = Number.parseInt(data['id']);
                if (id) {
                    this.categoryDefinitionsService
                        .getById(id)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            (response) => {
                                const { name, displayName, isActive } =
                                    response.responseObject;
                                Object.assign(
                                    this.categoryDefinition,
                                    response.responseObject
                                );
                                this.form.setValue({
                                    name,
                                    displayName,
                                    isActive,
                                });
                                this.editMode = true;
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                } else this.editMode = false;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }
    onSubmit = () => {
        this.loading = true;
        Object.assign(this.categoryDefinition, this.form.value);
        if (!this.editMode) {
            this.categoryDefinitionsService
                .create(this.categoryDefinition)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (response) => {
                        this.categoryDefinitionsService.changed.next();
                        this.loading = false;
                        this.navigateToDetails(response.responseObject.id);
                    },
                    (error) => {
                        this.loading = false;
                    }
                );
        } else {
            this.categoryDefinitionsService
                .update(this.categoryDefinition.id, this.categoryDefinition)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (response) => {
                        this.categoryDefinitionsService.changed.next();
                        this.loading = false;
                        this.navigateBack();
                    },
                    (error) => {
                        this.loading = false;
                    }
                );
        }
    };

    private navigateToDetails = (id: number) => {
        this.router.navigate(['../', id], {
            relativeTo: this.activatedRoute,
        });
    };
    private navigateBack = () => {
        this.router.navigate(['../'], {
            relativeTo: this.activatedRoute,
        });
    };
}
