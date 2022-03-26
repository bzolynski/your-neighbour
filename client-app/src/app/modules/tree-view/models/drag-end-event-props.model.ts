import { DropLocation, ITree } from '.';

export interface DragEndEventProps<T> {
    dragged: ITree<T>;
    draggedOver: ITree<T> | undefined;
    dropLocation: DropLocation;
}
