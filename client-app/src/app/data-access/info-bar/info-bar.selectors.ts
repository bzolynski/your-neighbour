import { createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const infoBarState = (state: RootState) => state.infoBar;

export const selectInfoBarOpen = createSelector(infoBarState, (state) => state.open);
export const selectInfoBarMessage = createSelector(infoBarState, (state) => state.message);
export const selectInfoBarType = createSelector(infoBarState, (state) => state.messageType);
