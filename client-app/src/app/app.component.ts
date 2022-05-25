import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeInfoBar } from './data-access/info-bar/info-bar.actions';
import { infoBarState } from './data-access/info-bar/info-bar.selectors';
import { RootState } from './data-access/root.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client-app';
    isBusy = false;
    infoBarState$ = this.store.select(infoBarState);
    constructor(private store: Store<RootState>) {}

    closeInfoBar = () => this.store.dispatch(closeInfoBar());
}
