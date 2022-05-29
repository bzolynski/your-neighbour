import { createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const infoBarState = (state: RootState) => state.infoBar;

export const selectMessages = createSelector(infoBarState, (state) => state.messages);
export const selectInfoBarOpen = createSelector(infoBarState, (state) => state.messages.length > 0);
