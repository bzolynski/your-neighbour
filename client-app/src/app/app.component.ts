import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { PrimeNGConfig } from 'primeng/api';
import { filter, tap } from 'rxjs/operators';
import { ChatService } from './messages/data-access/api/chat.service';
import { User } from '@core/models/';
import { Observable } from 'rxjs';
import { selectUser } from '@core/stores/authentication';
import { Store } from '@ngrx/store';
import { HttpRequestLoaderService } from '@core/services';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    user$: Observable<User | null> = this.store.select(selectUser);
    title = 'client-app';
    isBusy$: Observable<boolean> = this.loaderService.isLoading$;
    constructor(
        private chatService: ChatService,
        private store: Store,
        private loaderService: HttpRequestLoaderService,
        private primengConfig: PrimeNGConfig
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.chatService.init();
        this.user$
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
