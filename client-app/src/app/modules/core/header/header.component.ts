import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { signOut } from '../../authentication/store/authentication.action';
import { selectUser } from '../../authentication/store/authentication.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    user$ = this.store.select(selectUser);
    unsubscriber$: Subject<boolean> = new Subject<boolean>();
    constructor(private store: Store) {}
    logout = () => {
        this.store.dispatch(signOut());
    };
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
