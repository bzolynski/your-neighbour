import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState, MESSAGES_FEATURE_KEY } from './messages.reducer';

export const messagesState = createFeatureSelector<MessagesState>(MESSAGES_FEATURE_KEY);

export const selectChats = createSelector(messagesState, (state) => state.data);
export const selectStatus = createSelector(messagesState, (state) => state.status);
export const selectError = createSelector(messagesState, (state) => state.error);
