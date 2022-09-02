import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(private store: Store, private router: Router, private messageService: MessageService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.user$.pipe(
            map((user) => {
                if (user) return true;
                this.router.navigate(['welcome'], { queryParams: { returnUrl: state.url } });
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Musisz być zalogowany' });
                return false;
            })
        );
    }
}
