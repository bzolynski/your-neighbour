import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { ICategory } from 'src/app/shared/data-access/models';
@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
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
        this.categoryService
            .getMany()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (response) => {
                    this.categories = response;
                },
                (error) => {
                    console.log(error);
                }
            );
    };
}
