import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from './modules/core/authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    title = 'client-app';
    isBusy = true;
    unsubscriber$: Subject<boolean> = new Subject();

    constructor(authenticationService: AuthenticationService) {
        authenticationService
            .getCurrentUser()
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe(() => {
                this.isBusy = false;
            });
    }
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
