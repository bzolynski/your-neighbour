import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
    // Public properties
    category: ICategory = {} as ICategory;

    // Private members
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((data) => {
            const id: number = Number.parseInt(data['id']);
            if (id) {
                this.categoryService
                    .get(id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(
                        (response) => {
                            Object.assign(this.category, response);
                            console.log(response);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }
    openForm = () => {
        this.router.navigate(['edit'], {
            relativeTo: this.activatedRoute,
        });
    };

    delete = () => {
        this.categoryService
            .delete(this.category.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.categoryService.changed.next();
                this.router.navigate(['../'], {
                    relativeTo: this.activatedRoute,
                });
            });
    };
}
