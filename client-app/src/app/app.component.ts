import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { removeInfoBarMessage } from './data-access/notification/notification.actions';
import { selectInfoBarOpen, selectMessages } from './data-access/notification/notification.selectors';
import { RootState } from './data-access/root.state';
import { ChatService } from './messages/data-access/api/chat.service';
import { AuthenticationStore } from './shared/authentication/data-access';
import { IUser } from './shared/data-access/models';
import { MessageWithType } from './shared/ui/info-bar/info-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'client-app';
    isBusy = false;
    infoBarMessages$ = this.store.select(selectMessages);
    infoBarOpen$ = this.store.select(selectInfoBarOpen);
    constructor(private store: Store<RootState>, private chatService: ChatService, private authStore: AuthenticationStore) {}

    ngOnInit(): void {
        this.chatService.init();
        this.authStore.user$
            .pipe(
                filter(
                    (user): user is IUser =>
                        user !== null && this.chatService.getConnectionStatus() === HubConnectionState.Disconnected
                ),
                tap(() => this.chatService.startConnection())
            )
            .subscribe();
    }

    closeInfoBar = (message: MessageWithType) =>
        this.store.dispatch(removeInfoBarMessage({ message: message.message, messageType: message.type }));
}
