import { createReducer, on } from '@ngrx/store';
import { InfoBarMessageType } from 'src/app/shared/ui/info-bar/info-bar.component';
import { closeInfoBar, showInfoBar } from './info-bar.actions';

export const INFO_BAR_FEATURE_KEY = 'info bar';

export interface InfoBarState {
    open: boolean;
    message: string | null;
    messageType: InfoBarMessageType | null;
}

export const initialState: InfoBarState = {
    open: false,
    message: null,
    messageType: null,
};

export const infoBarReducer = createReducer(
    initialState,
    on(showInfoBar, (state, { message, messageType }) => ({
        ...state,
        open: true,
        message,
        messageType,
    })),
    on(closeInfoBar, (state) => ({
        ...state,
        open: false,
        message: null,
        messageType: null,
    }))
);
