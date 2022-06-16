import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { loadChat, sendMessage } from '../../data-access/store/open-message/open-message.actions';
import { selectChat, selectMessages } from '../../data-access/store/open-message/open-message.selectors';

@Component({
    selector: 'app-open-message',
    templateUrl: './open-message.component.html',
    styleUrls: ['./open-message.component.scss'],
})
export class OpenMessageComponent /*implements OnInit*/ {
    params$ = this.route.params.pipe(tap((params) => this.store.dispatch(loadChat({ id: +params['id'] }))));
    #chat$ = this.store.select(selectChat);
    #messages$ = this.store.select(selectMessages);
    #user$ = this.authStore.user$;
    vm$ = combineLatest([this.#chat$, this.#messages$, this.#user$, this.params$]).pipe(
        map(([chat, messages, user, params]) => ({ chat, messages, user, params }))
    );
    constructor(private route: ActivatedRoute, private store: Store, private authStore: AuthenticationStore) {}

    // ngOnInit(): void {}

    sendMessage = (input: HTMLInputElement) => {
        this.store.dispatch(sendMessage({ content: input.value }));
        input.value = '';
        // this.chatService.sendMessage({
        //     chatName: 'XDXDXD',
        //     content: content,
        // });
    };
}
