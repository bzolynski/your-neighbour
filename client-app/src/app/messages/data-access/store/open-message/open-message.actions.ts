import { createAction, props } from '@ngrx/store';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';

export const loadChat = createAction('[OpenMessageComponent] Load Chat', props<{ id: number }>());
export const loadChatSuccess = createAction('[OpenMessageComponent] Load Chat Success', props<{ chat: Chat }>());
export const loadChatError = createAction('[OpenMessageComponent] Load Chat Error', props<{ error: string }>());

export const loadMessagesSuccess = createAction('[OpenMessageComponent] Load Messages Success', props<{ messages: Message[] }>());
export const loadMessagesError = createAction('[OpenMessageComponent] Load Messages Error', props<{ error: string }>());

export const sendMessage = createAction('[OpenMessageComponent] Send Messages', props<{ content: string }>());

export const sendMessageSuccess = createAction('[OpenMessageComponent] Send Message Success');
export const sendMessageError = createAction('[OpenMessageComponent] Send Message Error', props<{ error: string }>());

export const openChatMessageReceived = createAction(
    '[OpenMessageComponent] Open Chat Message Received',
    props<{ message: Message }>()
);
/*
export const messageReceived = createAction('[OpenMessageComponent] Message Reveived', props<{ message: Message }>());
export const saveMessage = createAction('[OpenMessageComponent] Save message', props<{ message: Message }>());
*/
// export const messageReceivedError = createAction('[OpenMessageComponent] Message Reveived Error', props<{ error: string }>());
