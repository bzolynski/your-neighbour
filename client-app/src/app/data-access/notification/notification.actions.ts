import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/messages/data-access/models/message.model';
import { InfoBarMessageType } from 'src/app/shared/ui/info-bar/info-bar.component';

export const addInfoBarMessage = createAction(
    '[Notification] Add Message',
    props<{ message: string; messageType: InfoBarMessageType }>()
);
export const removeInfoBarMessage = createAction(
    '[Notification] Remove Message',
    props<{ message: string; messageType: InfoBarMessageType }>()
);

export const messageReceived = createAction('[Notification] Message Received', props<{ message: Message }>());
