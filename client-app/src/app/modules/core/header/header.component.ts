import { Component, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    user$ = this.authenticationStore.user$;
    unsubscriber$: Subject<boolean> = new Subject<boolean>();
    vm$ = combineLatest([this.user$]).pipe(
        map(([user]) => ({
            user,
        }))
    );
    constructor(private authenticationStore: AuthenticationStore) {}
    logout = () => {
        this.authenticationStore.signOut();
    };
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
