import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewRootDirective } from '../../../directives/tree-view';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit, OnDestroy {
    @Input() node: ITree<T> | undefined;
    public isExpanded: boolean = true;
    isExpandedSubject: Subject<boolean> = new Subject<boolean>();

    destroy$: Subject<boolean> = new Subject<boolean>();
    template: TemplateRef<any> | undefined;
    constructor(private root: TreeViewRootDirective<T>) {}
    ngOnInit(): void {
        this.template = this.root.componentTemplate;
        this.isExpandedSubject
            .pipe(takeUntil(this.destroy$))
            .subscribe((isExpanded) => {
                this.node!.isExpanded = isExpanded;
                this.isExpanded = isExpanded;
            });
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
