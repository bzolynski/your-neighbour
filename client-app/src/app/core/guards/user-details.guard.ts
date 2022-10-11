import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';
import { StringHelperMethods } from '@shared/utils/.';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserDetailsGuard implements CanActivate {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(private store: Store, private router: Router, private messageService: MessageService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.user$.pipe(
            map(
                (user) =>
                    !StringHelperMethods.isNullOrWhiteSpace(user?.firstName) &&
                    StringHelperMethods.isNullOrWhiteSpace(user?.lastName) &&
                    StringHelperMethods.isNullOrWhiteSpace(user?.phoneNumber)
            ),
            tap((result) => {
                if (!result) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Uwaga!',
                        detail: 'Niezbędne dane użytkownika nie zostały uzupełnione!',
                    });
                    this.router.navigate(['/settings', 'account']);
                }
            })
        );
    }
}
