import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategoryDefinition } from 'src/app/modules/core/models';
import { CategoryDefinitionsService } from 'src/app/modules/core/services/';

@Component({
	selector: 'app-category-definition-form',
	templateUrl: './category-definition-form.component.html',
	styleUrls: [ './category-definition-form.component.scss' ]
})
export class CategoryDefinitionFormComponent implements OnInit, OnDestroy {
	// Public properties
	categoryDefinition: ICategoryDefinition = {} as ICategoryDefinition;
	form: FormGroup = this.fb.group({
		name: [ null ],
		displayName: [ null ],
		isActive: [ true ]
	});

	// Private members
	destroy$: Subject<boolean> = new Subject<boolean>();
	editMode$: boolean = false;
	constructor(
		private fb: FormBuilder,
		private categoryDefinitionsService: CategoryDefinitionsService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
			const id: number = Number.parseInt(data['id']);
			if (id) {
				this.categoryDefinitionsService
					.getById(id)
					.pipe(takeUntil(this.destroy$))
					.subscribe(
						(data) => {
							const { name, displayName, isActive } = data.responseObject;
							Object.assign(this.categoryDefinition, data.responseObject);
							this.form.setValue({ name, displayName, isActive });
							this.editMode$ = true;
						},
						(error) => {
							console.log(error);
						}
					);
			} else this.editMode$ = false;
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe;
	}
	onSubmit = () => {
		Object.assign(this.categoryDefinition, this.form.value);
		if (!this.editMode$) {
			this.categoryDefinitionsService
				.create(this.categoryDefinition)
				.pipe(takeUntil(this.destroy$))
				.subscribe(
					(data) => {
						this.categoryDefinitionsService.changed.next();
					},
					(error) => {
						console.log('ERR');
						console.log(error);
					}
				);
		} else {
			this.categoryDefinitionsService
				.update(this.categoryDefinition.id, this.categoryDefinition)
				.pipe(takeUntil(this.destroy$))
				.subscribe(
					(data) => {
						this.categoryDefinitionsService.changed.next();
					},
					(error) => {
						console.log('ERR');
						console.log(error);
					}
				);
		}
		this.form.reset();
	};
}
