import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationStore } from '../authentication/data-access';

@Injectable({
    providedIn: 'root',
})
export class UserDetailsGuard implements CanActivate {
    constructor(private authStore: AuthenticationStore, private router: Router, private messageService: MessageService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authStore.userDetailsFilled$.pipe(
            tap((result) => {
                if (!result) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Warn',
                        detail: 'Niezbędne dane użytkownika nie zostały uzupełnione!',
                    });
                    this.router.navigate(['settings/my/account/edit']);
                }
            })
        );
    }
}
