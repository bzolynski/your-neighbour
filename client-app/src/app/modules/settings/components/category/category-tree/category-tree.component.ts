import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { ITree } from 'src/app/modules/core/types';

@Component({
    selector: 'app-category-tree',
    templateUrl: './category-tree.component.html',
    styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit, OnDestroy {
    treeItem: ITree<ICategory> | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService
            .getAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.treeItem = response.responseObject
                    .toLookup(
                        (x) => x,
                        (x) => x,
                        (p, c) => p.id == c.parentId
                    )
                    .toTree();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
