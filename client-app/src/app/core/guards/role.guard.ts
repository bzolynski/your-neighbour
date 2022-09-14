import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {
    user$: Observable<User | null> = this.store.select(selectUser);

    constructor(private store: Store) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data.roles as string[] | undefined;
        if (!roles) throw Error('Pass allowed roles in data');
        return this.user$.pipe(map((user) => user !== null && this.checkRoles(user.roles, roles)));
    }

    private checkRoles = (userRoles: string[], roles: string[]): boolean => {
        return userRoles.some((val1) => roles.some((val2) => val1 === val2));
    };
}
