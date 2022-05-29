import { createAction, props } from '@ngrx/store';
import { InfoBarMessageType } from 'src/app/shared/ui/info-bar/info-bar.component';

export const addInfoBarMessage = createAction(
    '[InfoBar] Add Message',
    props<{ message: string; messageType: InfoBarMessageType }>()
);
export const removeInfoBarMessage = createAction(
    '[InfoBar] Remove Message',
    props<{ message: string; messageType: InfoBarMessageType }>()
);
