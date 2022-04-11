import { IItemDetails } from 'src/app/modules/core/models/item.model';
import { StateStatus } from 'src/app/modules/core/types/state-status.type';

export const ITEM_DETAILS_STATE_NAME = 'itemDetails';

export interface ItemDetailsState {
    itemDetails: IItemDetails | null;
    status: StateStatus;
    error: string | null;
}

export const initialState: ItemDetailsState = {
    itemDetails: null,
    status: 'pending',
    error: null,
};
