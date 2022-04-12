import { IItemDetails } from 'src/app/modules/core/models/item.model';

export const ITEM_DETAILS_STATE_NAME = 'itemDetails';

export interface ItemDetailsState {
    itemDetails: IItemDetails | null;
    isBusy: boolean;
    error: string | null;
}

export const initialState: ItemDetailsState = {
    itemDetails: null,
    isBusy: false,
    error: null,
};
