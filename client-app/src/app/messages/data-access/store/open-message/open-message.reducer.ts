import { createReducer, on } from '@ngrx/store';
import { GenericState } from '@utils/types';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import {
    loadChat,
    loadChatError,
    loadChatSuccess,
    loadMessagesError,
    loadMessagesSuccess,
    openChatMessageReceived,
} from './open-message.actions';

export const OPEN_MESSAGE_FEATURE_KEY = 'open message';

export interface OpenMessageState extends GenericState<Chat> {
    messages: Message[];
}

export const initialState: OpenMessageState = {
    data: null,
    messages: [],
    error: null,
    status: 'pending',
};

export const openMessageReducer = createReducer(
    initialState,
    on(loadChat, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadChatSuccess, (state, { chat }) => ({
        ...state,
        status: 'success',
        data: chat,
    })),
    on(loadMessagesSuccess, (state, { messages }) => ({
        ...state,
        status: 'success',
        messages: messages,
    })),
    on(loadMessagesError, loadChatError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(openChatMessageReceived, (state, { message }) => ({
        ...state,
        messages: [...state.messages, message],
    }))
);
