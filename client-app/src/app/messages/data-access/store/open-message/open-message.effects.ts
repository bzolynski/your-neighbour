import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { User } from '@core/models/';
import { ChatService } from '../../api/chat.service';
import { Message } from '../../models/message.model';
import {
    loadChat,
    loadChatError,
    loadChatSuccess,
    loadMessagesError,
    loadMessagesSuccess,
    sendMessage,
    sendMessageSuccess,
} from './open-message.actions';
import { selectChat } from './open-message.selectors';
import { Observable } from 'rxjs';
import { selectUser } from '@core/stores/authentication';

@Injectable()
export class OpenMessageEffects {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(private actions$: Actions, private store: Store, private chatService: ChatService) {}

    loadChat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChat),
            switchMap(({ id }) => this.chatService.getChat(id)),
            map((chat) => loadChatSuccess({ chat: chat })),
            catchError((error: HttpErrorResponse) => of(loadChatError({ error: error.error ?? error.message })))
        )
    );

    loadMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChatSuccess),
            switchMap(({ chat }) => this.chatService.getMessages(chat.id)),
            map((messages) => loadMessagesSuccess({ messages: messages })),
            catchError((error: HttpErrorResponse) => of(loadMessagesError({ error: error.error ?? error.message })))
        )
    );

    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendMessage),
            withLatestFrom(this.store.select(selectChat), this.user$),
            tap(([_, __, user]) => this.#checkUserLoggedIn(user)),
            map(
                ([action, chat, user]) =>
                    ({
                        content: action.content,
                        senderId: user!.id,
                        chatId: chat!.id,
                    } as Message)
            ),
            switchMap((message) => this.chatService.sendMessage(message)),
            map((response) => {
                return sendMessageSuccess();
            }),
            catchError((error: any) => {
                console.log('ERRRRR', error);
                return of(loadMessagesError({ error: error.error ?? error.message }));
            })
        )
    );

    #checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            throwError(new Error('Nie jesteś zalogowany!'));
        }
    };
    /*
    messageReceived$ = createEffect(() =>
        this.actions$.pipe(
            ofType(messageReceived),
            withLatestFrom(this.store$),
            filter(([action, store]) => action.message.chatName === store.data?.name),
            map(([action]) => saveMessage({ message: action.message }))
        )
    );*/
}
