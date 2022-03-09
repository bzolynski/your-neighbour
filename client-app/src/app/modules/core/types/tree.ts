import { ILookup } from '.';

export interface ITree<T> {
    data: T;
    parent: ITree<T> | undefined;
    children: Array<ITree<T>>;
    // temp solution - move it to treeviewrootclass or smth
    isExpanded: boolean;
    readonly isRoot: boolean;
    readonly level: number;
    readonly isLeaf: boolean;
}

export class Tree<T> implements ITree<T> {
    data: T;
    parent: ITree<T> | undefined;
    children: Array<ITree<T>>;
    // temp solution - move it to treeviewrootclass or smth
    isExpanded: boolean = true;
    get isLeaf(): boolean {
        return this.children.length == 0;
    }
    get isRoot(): boolean {
        return this.parent == undefined;
    }
    get level(): number {
        return this.parent == undefined ? 0 : this.parent.level + 1;
    }

    private constructor(data: T, parent?: ITree<T>) {
        this.children = new Array<ITree<T>>();
        this.data = data;
        this.parent = parent;
    }

    static fromLookup = <T>(lookup: ILookup<T, T>): ITree<T> => {
        const c: [T, T[]] = lookup.entries().next().value;
        const root = new Tree<T>(c[0]);
        root.loadChildren(lookup);
        return root;
    };

    private loadChildren = (lookup: ILookup<T, T>) => {
        for (const data of lookup.get(this.data)) {
            const child = new Tree<T>(data, this);
            this.children.push(child);
            child.loadChildren(lookup);
        }
    };
}
