import { createAction, props } from '@ngrx/store';
import { IImage } from 'src/app/modules/core/models/image.model';

export const addItemImage = createAction('[Advertisement Form] Add Item Image', props<{ image: IImage }>());

export const loadItemImages = createAction('[Advertisement Form] Load Item Images', props<{ id: number }>());

export const loadItemImagesSuccess = createAction('[Advertisement Form] Load Item Images Success', props<{ images: IImage[] }>());

export const loadItemImagesError = createAction('[Advertisement Form] Load Item Images Error', props<{ error: string }>());
