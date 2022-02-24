import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
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
    @ViewChild('treeContainer') treeContainerRef!: ElementRef<HTMLElement>;
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
                console.log(this.treeItem);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    dragOver = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const cos = this.getAfterId(e.clientY);
        const dragging = document.querySelector('.dragging');
        if (dragging) {
            if (cos == null || cos.child == undefined)
                this.treeContainerRef.nativeElement.appendChild(dragging);
            if (cos.child) {
                this.treeContainerRef.nativeElement.insertBefore(
                    dragging,
                    cos.child
                );
            }
        }
    };

    getAfterId = (
        yPosition: number
    ): { offset: number; child: Element | undefined } => {
        const draggables = [
            ...this.treeContainerRef.nativeElement.querySelectorAll(
                '[draggable="true"]:not(.dragging)'
            ),
        ];

        return draggables.reduce(
            (
                closest: {
                    offset: number;
                    child: Element | undefined;
                },
                child
            ) => {
                const box = child.getBoundingClientRect();
                const offset = yPosition - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset, child };
                } else return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                child: undefined,
            }
        );
    };
}
