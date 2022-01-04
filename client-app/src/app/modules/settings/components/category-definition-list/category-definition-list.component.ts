import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategoryDefinition } from 'src/app/modules/core/models';
import { CategoryDefinitionsService } from 'src/app/modules/core/services';

@Component({
	selector: 'app-category-definition-list',
	templateUrl: './category-definition-list.component.html',
	styleUrls: [ './category-definition-list.component.scss' ]
})
export class CategoryDefinitionListComponent implements OnInit, OnDestroy {
	// Public properties
	categoryDefinitions: Array<ICategoryDefinition> = [] as Array<ICategoryDefinition>;
	// Private members
	destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private categoryDefinitionService: CategoryDefinitionsService) {}

	ngOnInit(): void {
		this.categoryDefinitionService.changed.pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.fetchCategoryDefinitions();
		});
		this.fetchCategoryDefinitions();
		console.log(this.categoryDefinitions);
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	private fetchCategoryDefinitions = () => {
		this.categoryDefinitionService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
			(response) => {
				this.categoryDefinitions = response.responseObject;
			},
			(error) => {
				console.log(error);
			}
		);
	};
}
