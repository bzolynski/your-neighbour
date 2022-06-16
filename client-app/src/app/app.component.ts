import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeInfoBarMessage } from './data-access/notification/notification.actions';
import { selectInfoBarOpen, selectMessages } from './data-access/notification/notification.selectors';
import { RootState } from './data-access/root.state';
import { ChatService } from './messages/data-access/api/chat.service';
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
    constructor(private store: Store<RootState>, private chatService: ChatService) {}

    ngOnInit(): void {
        this.chatService.startConnection();
        this.chatService.initListeners();
    }

    closeInfoBar = (message: MessageWithType) =>
        this.store.dispatch(removeInfoBarMessage({ message: message.message, messageType: message.type }));
}
