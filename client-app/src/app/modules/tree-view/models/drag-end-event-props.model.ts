import { DropLocation } from '.';
import { ITree } from '../../core/types';

export interface DragEndEventProps<T> {
    dragged: ITree<T>;
    draggedOver: ITree<T> | undefined;
    dropLocation: DropLocation;
}
