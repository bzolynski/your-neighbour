import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { IUser } from '../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    user: IUser | null = null;
    unsubscriber$: Subject<boolean> = new Subject<boolean>();
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        authenticationService.currentUserChanged.pipe(takeUntil(this.unsubscriber$)).subscribe((user) => (this.user = user));
    }
    logout = () => {
        this.authenticationService.logout().subscribe((response) => {
            this.router.navigateByUrl('welcome');
        });
    };
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
