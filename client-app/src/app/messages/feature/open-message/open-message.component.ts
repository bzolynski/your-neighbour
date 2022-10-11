import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { loadChat, sendMessage } from '../../data-access/store/open-message/open-message.actions';
import { selectChat, selectMessages } from '../../data-access/store/open-message/open-message.selectors';

@Component({
    selector: 'app-open-message',
    templateUrl: './open-message.component.html',
    styleUrls: ['./open-message.component.scss'],
})
export class OpenMessageComponent {
    params$ = this.route.params.pipe(tap((params) => this.store.dispatch(loadChat({ id: +params['id'] }))));
    #chat$ = this.store.select(selectChat);
    #messages$ = this.store.select(selectMessages);
    #user$: Observable<User | null> = this.store.select(selectUser);

    vm$ = combineLatest([this.#chat$, this.#messages$, this.#user$, this.params$]).pipe(
        map(([chat, messages, user, params]) => ({ chat, messages, user, params }))
    );

    constructor(private route: ActivatedRoute, private store: Store) {}
    sendMessage = (input: HTMLInputElement) => {
        if (input.value.trim() !== '') {
            this.store.dispatch(sendMessage({ content: input.value.trim() }));
        }
        input.value = '';
    };
}
