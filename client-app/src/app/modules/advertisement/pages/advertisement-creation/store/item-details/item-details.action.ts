import { createAction, props } from '@ngrx/store';
import { IItemDetails } from 'src/app/modules/core/models/item.model';

export const loadItemDetails = createAction('[Advertisement Form] Load Item Details', props<{ id: number }>());

export const loadItemDetailsSuccess = createAction(
    '[Advertisement Form] Load Item Details Success',
    props<{ itemDetails: IItemDetails }>()
);

export const loadItemDetailsError = createAction('[Advertisement Form] Load Item Details Error', props<{ error: string }>());
