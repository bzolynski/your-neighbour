import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OpenMessageState, OPEN_MESSAGE_FEATURE_KEY } from './open-message.reducer';

export const openMessageState = createFeatureSelector<OpenMessageState>(OPEN_MESSAGE_FEATURE_KEY);

export const selectChat = createSelector(openMessageState, (state) => state.data);
export const selectMessages = createSelector(openMessageState, (state) => state.messages);
export const selectStatus = createSelector(openMessageState, (state) => state.status);
export const selectError = createSelector(openMessageState, (state) => state.error);
