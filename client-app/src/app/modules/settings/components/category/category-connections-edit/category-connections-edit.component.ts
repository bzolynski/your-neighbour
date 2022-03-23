import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { Dictionary, ITree } from 'src/app/modules/core/types';
import { faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-category-connections-edit',
    templateUrl: './category-connections-edit.component.html',
    styleUrls: ['./category-connections-edit.component.scss'],
})
export class CategoryConnectionsEditComponent implements OnInit, OnDestroy {
    treeItem: ITree<ICategory> | undefined;
    unasignedCategories: Array<ICategory> | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();
    faChevronDown: IconDefinition = faChevronDown;
    parentChanges: Dictionary<number, number | null> = new Dictionary<number, number | null>();
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
        this.categoryService
            .getUnassigned()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.unasignedCategories = response.responseObject;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    treeDragEnd = (data: {
        draggedItem: ITree<ICategory>;
        draggedOverItem: ITree<ICategory> | null;
    }): void => {
        //data.draggedItem.changeParent(data.draggedOverItem);
        this.parentChanges.set(data.draggedItem.data.id, data.draggedOverItem?.data.id ?? null);
        if (data.draggedItem.parent == data.draggedOverItem)
            this.parentChanges.delete(data.draggedItem.data.id);

        console.log(this.parentChanges);
    };
}
