import { IImage } from 'src/app/modules/core/models/image.model';

export const ITEM_IMAGES_STATE_NAME = 'itemImages';

export interface ItemImagesState {
    images: IImage[];
    isBusy: boolean;
    error: string | null;
}

export const initialState: ItemImagesState = {
    images: [],
    isBusy: false,
    error: null,
};
