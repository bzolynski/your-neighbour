import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategoryDefinition } from 'src/app/modules/core/models';
import { CategoryDefinitionsService } from 'src/app/modules/core/services';

@Component({
	selector: 'app-category-definition-details',
	templateUrl: './category-definition-details.component.html',
	styleUrls: [ './category-definition-details.component.scss' ]
})
export class CategoryDefinitionDetailsComponent implements OnInit {
	// Public properties
	categoryDefinition: ICategoryDefinition = {} as ICategoryDefinition;

	// Private members
	destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private categoryDefinitionsService: CategoryDefinitionsService,
		private activatedRoute: ActivatedRoute,
		private router: Router
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
							Object.assign(this.categoryDefinition, data.responseObject);
						},
						(error) => {
							console.log(error);
						}
					);
			}
		});
	}

	openForm = () => {
		this.router.navigate([ 'edit' ], {
			relativeTo: this.activatedRoute
		});
	};
	delete = () => {
		this.categoryDefinitionsService
			.delete(this.categoryDefinition.id)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				(data) => {
					console.log(`Usunięto pomyślnie : ${data.responseObject ? 'tak' : 'nie'}`);
					this.categoryDefinitionsService.changed.next();
					this.navigateBack();
				},
				(error) => {
					console.log(error);
				}
			);
	};
    private navigateBack = () => {
        this.router.navigate([ '../' ], {
            relativeTo: this.activatedRoute
        });
    }
}
