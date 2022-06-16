import { createReducer, on } from '@ngrx/store';
import { InfoBarMessageType, MessageWithType } from 'src/app/shared/ui/info-bar/info-bar.component';
import { addInfoBarMessage, removeInfoBarMessage } from './notification.actions';

export const NOTIFICATION_FEATURE_KEY = 'info bar';

export interface NotificationState {
    open: boolean;
    message: string | null;
    messageType: InfoBarMessageType | null;
    messages: MessageWithType[];
}

export const initialState: NotificationState = {
    open: false,
    message: null,
    messageType: null,
    messages: [],
};

export const notificationReducer = createReducer(
    initialState,
    on(addInfoBarMessage, (state, { message, messageType }) => ({
        ...state,
        messages: [...state.messages, { message: message, type: messageType }],
    })),
    on(removeInfoBarMessage, (state, { message, messageType }) => ({
        ...state,
        messages: state.messages.filter((value) => value.message !== message && value.type !== messageType),
    }))
);
