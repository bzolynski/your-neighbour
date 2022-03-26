export interface ITree<T> {
    data: T;
    parent: ITree<T> | undefined;
    children: Array<ITree<T>>;
    readonly isRoot: boolean;
    readonly level: number;
    readonly isLeaf: boolean;
    changeParent(parent: ITree<T> | undefined): void;
    flatten(): Array<ITree<T>>;
}
