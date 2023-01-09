import { Injectable, Provider } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpRequestLoaderService } from '@core/services';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpRequestLoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: HttpRequestLoaderService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.setLoading(true);

        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.loaderService.setLoading(false);
                    return throwError(error);
                })
            )
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.setLoading(false);
                    }
                    return event;
                })
            );
    }
}

export const httpRequestLoaderInterceptionProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestLoaderInterceptor,
    multi: true,
};
