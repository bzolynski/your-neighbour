import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ICategory, ROOT_CATEGORY_GUID } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { Dictionary } from 'src/app/modules/core/types';
import { faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DragEndEventProps } from 'src/app/modules/tree-view/models/drag-end-event-props.model';
import { ITree } from 'src/app/modules/tree-view/models';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { ChildParentPair } from 'src/app/modules/core/types/child-parent-pair.type';
import { CanComponentDeactivate } from 'src/app/modules/core/guards/can-deactivate.guard';
import { UrlTree } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'app-category-connections-edit',
    templateUrl: './category-connections-edit.component.html',
    styleUrls: ['./category-connections-edit.component.scss'],
})
export class CategoryConnectionsEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    treeItem: ITree<ICategory> | undefined;
    unasignedCategories: Array<ICategory> | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();
    faChevronDown: IconDefinition = faChevronDown;
    parentChanges: Dictionary<number, number | null> = new Dictionary<number, number | null>();
    constructor(private categoryService: CategoryService, private messageService: MessageService) {}

    canDeactivate = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        if (!this.parentChanges.keys().next().value) return true;
        return this.messageService.showConfirmationDialog('Czy chcesz odrzucić niezapisane zmiany?').pipe(map((x) => x.result));
    };

    ngOnInit(): void {
        this.categoryService
            .getMany()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.treeItem = response
                    .toLookup(
                        (x) => x,
                        (x) => x,
                        (p, c) => p.id == c.parentId
                    )
                    .toTree((lookup) => [...lookup].filter((val) => val[0].guid == ROOT_CATEGORY_GUID)[0]);
            });
        this.categoryService
            .getUnassigned()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                this.unasignedCategories = response;
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
        // todo: change history.
        //if (data.dragged.parent?.data.id == parentId) this.parentChanges.delete(data.dragged.data.id);
        //else
        this.parentChanges.set(data.dragged.data.id, parentId ?? null);
    };

    submitChanges = () => {
        const childParentPairs = Array.from(this.parentChanges, ([key, value]) => {
            return new ChildParentPair(key, value);
        });

        this.categoryService.changeParent(childParentPairs).subscribe(
            (response) => {
                this.parentChanges.clear();
                this.messageService.showMessage('Pomyślnie zaktualizowano kategorie!', 'success');
            },
            (error: HttpErrorResponse) => {
                this.messageService.showMessage(error.message, 'error');
            }
        );
    };
}
