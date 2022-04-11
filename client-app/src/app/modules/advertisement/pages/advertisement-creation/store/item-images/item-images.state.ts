import { IImage } from 'src/app/modules/core/models/image.model';
import { StateStatus } from 'src/app/modules/core/types/state-status.type';

export const ITEM_IMAGES_STATE_NAME = 'itemImages';

export interface ItemImagesState {
    images: IImage[];
    status: StateStatus;
    error: string | null;
}

export const initialState: ItemImagesState = {
    images: [],
    status: 'pending',
    error: null,
};
