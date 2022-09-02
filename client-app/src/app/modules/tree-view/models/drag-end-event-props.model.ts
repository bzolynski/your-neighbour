import { DropLocation } from '.';
import { ITree } from '@app-types/.';
export interface DragEndEventProps<T> {
    dragged: ITree<T>;
    draggedOver: ITree<T> | undefined;
    dropLocation: DropLocation;
}
