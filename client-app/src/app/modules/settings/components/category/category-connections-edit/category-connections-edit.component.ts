import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { Dictionary } from 'src/app/modules/core/types';
import { faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DragEndEventProps } from 'src/app/modules/tree-view/models/drag-end-event-props.model';
import { ITree } from 'src/app/modules/tree-view/models';
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

    treeDragEnd = (data: DragEndEventProps<ICategory>): void => {
        let parentId: number | undefined = undefined;
        switch (data.dropLocation) {
            case 'above':
            case 'bellow': {
                parentId = data.draggedOver?.parent?.data.id;
                break;
            }
            case 'inside': {
                parentId = data.draggedOver?.data.id;
                break;
            }
            default: {
                parentId = undefined;
                break;
            }
        }

        if (data.dragged.parent?.data.id == parentId) this.parentChanges.delete(data.dragged.data.id);
        else this.parentChanges.set(data.dragged.data.id, parentId ?? null);
        console.log(this.parentChanges);
    };
}
