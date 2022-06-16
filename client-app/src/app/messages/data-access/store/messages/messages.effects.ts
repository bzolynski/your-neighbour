import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ChatService } from '../../api/chat.service';
import { loadChats, loadChatsError, loadChatsSuccess } from './messages.actions';
import { MessagesState } from './messages.reducer';

@Injectable()
export class MessagesEffects {
    constructor(private actions$: Actions, private store$: Store<MessagesState>, private chatService: ChatService) {}

    loadChats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChats),
            switchMap(() => this.chatService.getChats()),
            map((chats) => loadChatsSuccess({ chats: chats })),
            catchError((error: HttpErrorResponse) => of(loadChatsError({ error: error.error ?? error.message })))
        )
    );
}
