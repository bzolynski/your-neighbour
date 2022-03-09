import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { ITree } from 'src/app/modules/core/types';

@Component({
    selector: 'app-category-connections-edit',
    templateUrl: './category-connections-edit.component.html',
    styleUrls: ['./category-connections-edit.component.scss'],
})
export class CategoryConnectionsEditComponent implements OnInit, OnDestroy {
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
                console.log('tree item w componencie');
                console.log(this.treeItem);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
