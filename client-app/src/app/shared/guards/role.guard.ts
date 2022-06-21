import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationStore } from '../authentication/data-access';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private authStore: AuthenticationStore) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data.roles as string[] | undefined;
        if (!roles) throw Error('Pass allowed roles in data');
        return this.authStore.user$.pipe(map((user) => user !== null && this.#checkRoles(user.roles, roles)));
    }

    #checkRoles = (userRoles: string[], roles: string[]): boolean => {
        return userRoles.some((val1) => roles.some((val2) => val1 === val2));
    };
}
