import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    user$ = this.authenticationStore.user$;
    unsubscriber$: Subject<boolean> = new Subject<boolean>();
    constructor(private authenticationStore: AuthenticationStore) {}
    logout = () => {
        this.authenticationStore.signOut();
    };
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
