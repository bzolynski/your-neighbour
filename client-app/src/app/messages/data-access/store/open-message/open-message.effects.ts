import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { messageReceived } from 'src/app/data-access/notification/notification.actions';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IUser } from 'src/app/shared/data-access/models';
import { ChatService } from '../../api/chat.service';
import { Message } from '../../models/message.model';
import {
    loadChat,
    loadChatError,
    loadChatSuccess,
    loadMessagesError,
    loadMessagesSuccess,
    openChatMessageReceived,
    sendMessage,
    sendMessageSuccess,
} from './open-message.actions';
import { selectChat } from './open-message.selectors';

@Injectable()
export class OpenMessageEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private chatService: ChatService,
        private authStore: AuthenticationStore
    ) {}

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
            withLatestFrom(this.store$.select(selectChat), this.authStore.user$),
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
    messageReceived$ = createEffect(() =>
        this.actions$.pipe(
            ofType(messageReceived),
            withLatestFrom(this.store$.select(selectChat)),
            filter(([action, chat]) => action.message.chatId === chat?.id),
            map(([action]) => openChatMessageReceived({ message: action.message }))
        )
    );

    #checkUserLoggedIn = (user: IUser | null) => {
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
