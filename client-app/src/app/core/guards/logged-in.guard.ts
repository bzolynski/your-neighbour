import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {
    user$: Observable<User | null> = this.store.select(selectUser);

    constructor(private store: Store, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.user$.pipe(
            map((user) => {
                if (!user) return true;
                this.router.navigate(['']);
                return false;
            })
        );
    }
}
