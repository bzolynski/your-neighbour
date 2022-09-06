import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@services/.';
@Injectable()
export class AuthentiacionInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/authentication/')) {
            return next.handle(req).pipe(catchError(this.handleError));
        }
        return next.handle(req).pipe(
            catchError((error) => {
                if (error.status == 401) {
                    return this.handleUnauthorized(req, next, error);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private handleError = (error: any, caught: Observable<any>) => {
        this.router.navigateByUrl('/welcome');
        return throwError(error);
    };

    private handleUnauthorized = (req: HttpRequest<any>, next: HttpHandler, firstError: any): Observable<HttpEvent<any>> => {
        return this.authenticationService.refreshToken().pipe(
            switchMap(() => {
                return next.handle(req);
            }),
            catchError((error, caught) => this.handleError(firstError, caught))
        );
    };
}

export const authenticationInterceptionProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthentiacionInterceptor,
    multi: true,
};
