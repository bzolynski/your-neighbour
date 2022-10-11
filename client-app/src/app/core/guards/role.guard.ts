import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Role, User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {
    user$: Observable<User | null> = this.store.select(selectUser);

    constructor(private store: Store, private messageService: MessageService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data.roles as Role[] | undefined;
        console.log(roles);
        if (roles === undefined || roles?.length < 1) throw Error('Pass allowed roles in data.');
        return this.user$.pipe(
            map((user) => user !== null && this.checkRoles(user.roles, roles)),
            tap((canAccess) => {
                if (canAccess) return;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Nie jesteś upoważniony do dostępu do tego routa!',
                });
            })
        );
    }

    private checkRoles = (userRoles: string[], roles: string[]): boolean => {
        return userRoles.some((val1) => roles.some((val2) => val1 === val2));
    };
}
