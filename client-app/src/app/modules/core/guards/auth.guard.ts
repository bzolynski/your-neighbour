import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { MessageService } from '../services/message.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationStore: AuthenticationStore,
        private router: Router,
        private messageService: MessageService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationStore.user$.pipe(
            map((user) => {
                if (user) return true;
                this.router.navigate(['welcome'], { queryParams: { returnUrl: state.url } });
                this.messageService.showMessage('Musisz być zalogowany', 'warning');
                return false;
            })
        );
    }
}
