import { createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const notificationState = (state: RootState) => state.notification;

export const selectMessages = createSelector(notificationState, (state) => state.messages);
export const selectInfoBarOpen = createSelector(notificationState, (state) => state.messages.length > 0);
