import { createAction, props } from '@ngrx/store';
import { Chat } from '../../models/chat.model';

export const loadChats = createAction('[MessagesComponent] Load Chats');
export const loadChatsSuccess = createAction('[MessagesComponent] Load Chats Success', props<{ chats: Chat[] }>());
export const loadChatsError = createAction('[MessagesComponent] Load Chats Error', props<{ error: string }>());
