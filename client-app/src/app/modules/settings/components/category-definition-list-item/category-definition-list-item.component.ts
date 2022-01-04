import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoryDefinition } from 'src/app/modules/core/models';

@Component({
	selector: 'app-category-definition-list-item',
	templateUrl: './category-definition-list-item.component.html',
	styleUrls: [ './category-definition-list-item.component.scss' ]
})
export class CategoryDefinitionListItemComponent implements OnInit {
	@Input() categoryDefinition: ICategoryDefinition = {} as ICategoryDefinition;
	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {}

	openDetails = () => {
		this.router.navigate([ this.categoryDefinition.id ], { relativeTo: this.activatedRoute });
	};
}
