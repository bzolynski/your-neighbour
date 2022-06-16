import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { messageReceived } from 'src/app/data-access/notification/notification.actions';
import { ApiService } from 'src/app/shared/data-access/api';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private apiService: ApiService, private store: Store) {}

    private hubConnection?: HubConnection;

    initListeners = () => {
        this.hubConnection?.on('ReceiveMessage', (data) => {
            this.store.dispatch(messageReceived({ message: data as Message }));
        });
    };

    startConnection = () => {
        this.hubConnection = new HubConnectionBuilder().withUrl(`https://localhost:5001/chat`).build();
        this.hubConnection.start();
    };

    addToChat = (chatName: string) => {
        this.hubConnection?.invoke('AddToRoom', chatName);
    };

    sendMessage = (messageTest: Message): Observable<any> => {
        if (this.hubConnection) return from(this.hubConnection.invoke('SendMessage', messageTest));
        throw new Error('Hub connection was not started');
    };

    getChat = (id: number): Observable<Chat> => {
        return this.apiService.get(`chat/get-chat/${id}`);
    };
    getChats = (): Observable<Chat[]> => {
        return this.apiService.get(`chat/get-chats`);
    };

    getMessages = (chatId: number): Observable<Message[]> => {
        return this.apiService.get(`chat/get-messages/${chatId}`);
    };
}
