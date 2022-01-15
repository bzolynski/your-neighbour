import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models/category.model';
import { CategoryService } from 'src/app/modules/core/services/category.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: [ './category-list.component.scss' ]
})
export class CategoryListComponent implements OnInit, OnDestroy {
	// Public properties
	categories: Array<ICategory> = [] as Array<ICategory>;

	// Private members
	destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryService.changed.pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.fetchCategories();
		});
		this.fetchCategories();
	}
	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe;
	}
	private fetchCategories = () => {
		this.categoryService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
			(response) => {
				this.categories = response.responseObject;
			},
			(error) => {
				console.log(error);
			}
		);
	};
}
