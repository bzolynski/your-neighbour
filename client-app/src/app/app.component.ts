import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { PrimeNGConfig } from 'primeng/api';
import { filter, tap } from 'rxjs/operators';
import { ChatService } from './messages/data-access/api/chat.service';
import { AuthenticationStore } from './shared/authentication/data-access';
import { User } from '@models/';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'client-app';
    isBusy = false;
    constructor(private chatService: ChatService, private authStore: AuthenticationStore, private primengConfig: PrimeNGConfig) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.chatService.init();
        this.authStore.user$
            .pipe(
                filter(
                    (user): user is User =>
                        user !== null && this.chatService.getConnectionStatus() === HubConnectionState.Disconnected
                ),
                tap(() => this.chatService.startConnection())
            )
            .subscribe();
    }
}
