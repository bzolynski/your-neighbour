import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadChats } from '../../data-access/store/messages/messages.actions';
import { selectChats } from '../../data-access/store/messages/messages.selectors';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
    #chats$ = this.store.select(selectChats);
    vm$ = combineLatest([this.#chats$]).pipe(map(([chats]) => ({ chats })));

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadChats());
    }
}
