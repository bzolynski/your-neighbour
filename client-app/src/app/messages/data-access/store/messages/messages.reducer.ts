import { createReducer, on } from '@ngrx/store';
import { GenericState } from '@utils/types';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { loadChats, loadChatsError, loadChatsSuccess } from './messages.actions';

export const MESSAGES_FEATURE_KEY = 'messages';

export interface MessagesState extends GenericState<Chat[]> {
    messages: Message[];
}

export const initialState: MessagesState = {
    data: [],
    messages: [],
    error: null,
    status: 'pending',
};

export const messagesReducer = createReducer(
    initialState,
    on(loadChats, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadChatsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadChatsSuccess, (state, { chats }) => ({
        ...state,
        status: 'success',
        data: chats,
    }))
);
