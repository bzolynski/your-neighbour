import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError, ResponseStatus } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ErrorResponseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((httpError: HttpErrorResponse | HttpError) => {
                if (!httpError.error.responseStatus) {
                    httpError = {
                        ...httpError,
                        error: {
                            errorMessages: httpError.message,
                            responseObject: null,
                            responseStatus: ResponseStatus.error,
                        },
                    };
                }
                return throwError(httpError);
            })
        );
    }
}
