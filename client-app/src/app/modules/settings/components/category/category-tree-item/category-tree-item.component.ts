import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ICategory } from 'src/app/modules/core/models';
import { ITree } from 'src/app/modules/core/types';

@Component({
    selector: 'app-category-tree-item',
    templateUrl: './category-tree-item.component.html',
    styleUrls: ['./category-tree-item.component.scss'],
})
export class CategoryTreeItemComponent implements OnInit, AfterViewInit {
    @Input() treeItem!: ITree<ICategory>;
    @ViewChild('treeContainer') treeContainerRef!: ElementRef;
    isExpanded: boolean = true;
    draggables: NodeListOf<Element> | undefined;
    container: NodeListOf<Element> | undefined;

    dragging: boolean = false;
    zindex: string | undefined;
    constructor(private myElement: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        this.draggables = document.querySelectorAll('[draggable=true]');
        this.container = document.querySelectorAll('.tree-root-container');
        this.myElement.nativeElement.ondragstart = this.startDrag;
        this.myElement.nativeElement.ondragend = this.endDrag;
        //this.myElement.nativeElement.ondragover = this.dragOver;
        this.myElement.nativeElement.draggable = !this.treeItem.isRoot;
    }
    ngAfterViewInit(): void {
        console.log(this.treeItem.data.name);
        console.log(this.treeContainerRef);
        console.log(this.treeItem.data.name);
        this.treeContainerRef.nativeElement.ondragover = this.dragOver;
    }
    triggerExpand = () => {
        this.isExpanded = !this.isExpanded;
    };

    startDrag = (e: DragEvent) => {
        e.stopPropagation();
        e.stopPropagation();
        this.myElement.nativeElement.classList.add('dragging');
        this.dragging = true;
    };

    endDrag = (e: DragEvent) => {
        e.stopPropagation();
        console.log('sdrag stopped');
        console.log(this.myElement.nativeElement);
        console.log('drag stopped');
        this.myElement.nativeElement.classList.remove('dragging');
        this.dragging = false;
    };

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
            ...this.myElement.nativeElement.querySelectorAll(
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

                if (offset < 0 && offset > closest.offset)
                    return { offset, child };
                else return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                child: undefined,
            }
        );
    };
}
