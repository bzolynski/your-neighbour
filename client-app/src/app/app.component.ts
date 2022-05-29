import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeInfoBarMessage } from './data-access/info-bar/info-bar.actions';
import { selectInfoBarOpen, selectMessages } from './data-access/info-bar/info-bar.selectors';
import { RootState } from './data-access/root.state';
import { MessageWithType } from './shared/ui/info-bar/info-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client-app';
    isBusy = false;
    infoBarMessages$ = this.store.select(selectMessages);
    infoBarOpen$ = this.store.select(selectInfoBarOpen);
    constructor(private store: Store<RootState>) {}

    closeInfoBar = (message: MessageWithType) =>
        this.store.dispatch(removeInfoBarMessage({ message: message.message, messageType: message.type }));
}
