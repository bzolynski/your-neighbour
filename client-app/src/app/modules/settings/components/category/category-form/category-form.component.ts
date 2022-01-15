import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory, ICategoryDefinition } from 'src/app/modules/core/models';
import { CategoryDefinitionsService, CategoryService } from 'src/app/modules/core/services';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: [ './category-form.component.scss' ]
})
export class CategoryFormComponent implements OnInit, OnDestroy {
	// Public properties
	editMode: boolean = false;
	loading: boolean = false;
	category: ICategory = {} as ICategory;
	definitions: Array<ICategoryDefinition> = [] as Array<ICategoryDefinition>;
	form: FormGroup = this.fb.group({
		name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
		definitionId: new FormControl(null, [ Validators.required ]),
		isActive: new FormControl(true)
	});

    get nameErrorMessage() {
        const nameControl = this.form.controls['name'];
        if(nameControl.errors?.required)
            return "Pole jest wymagane";
        if(nameControl.errors?.minlength)
            return `Minimalna długość: ${nameControl.errors?.minlength?.requiredLength}`;
        return '';
    }
    get definitionIdErrorMessage() {
        const nameControl = this.form.controls['name'];
        if(nameControl.errors?.required)
            return "Pole jest wymagane";

        return '';
    }

	// Private members
	destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		private categoryDefinitionService: CategoryDefinitionsService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
			const id: number = Number.parseInt(data['id']);
			if (id) {
				this.categoryService
					.getById(id)
					.pipe(takeUntil(this.destroy$))
					.subscribe((response) => {
						const { name, definition, isActive } = response.responseObject;
						const definitionId = definition.id;
						Object.assign(this.category, response.responseObject);
						this.form.setValue({ name, definitionId, isActive });
						this.editMode = true;
					});
			} else this.editMode = false;
		});
		this.categoryDefinitionService
			.getAll()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response) => {
				this.definitions = response.responseObject;
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe;
	}

	onSubmit = () => {
		this.loading = true;
		Object.assign(this.category, this.form.value);
		this.categoryService.create(this.category).pipe(takeUntil(this.destroy$)).subscribe(
			(response) => {
				this.categoryService.changed.next();
				this.loading = false;
				this.navigateToDetails(response.responseObject.id);
			},
			(error) => {
				this.loading = false;
			}
		);
	};

	private navigateToDetails = (id: number) => {
		this.router.navigate([ '../', id ], {
			relativeTo: this.activatedRoute
		});
	};
	private navigateBack = () => {
		this.router.navigate([ '../' ], {
			relativeTo: this.activatedRoute
		});
	};
}
