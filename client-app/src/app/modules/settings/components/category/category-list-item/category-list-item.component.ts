import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/shared/data-access/models';

@Component({
	selector: 'app-category-list-item',
	templateUrl: './category-list-item.component.html',
	styleUrls: [ './category-list-item.component.scss' ]
})
export class CategoryListItemComponent implements OnInit {
	// Public properties
	@Input() category: ICategory = {} as ICategory;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {}

	openDetails = () => {
		this.router.navigate([ this.category.id ], { relativeTo: this.activatedRoute });
	};
}
