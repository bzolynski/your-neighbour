import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private client: HttpClient) {}

    private handleError = (httpError: HttpErrorResponse, caught: Observable<any>) => {
        // for ex: logs
        console.log(httpError);

        return throwError(httpError);
    };

    get = <T>(path: string, params?: HttpParams): Observable<T> => {
        return this.client.get<T>(`${environment.api_url}/${path}`, { params: params }).pipe(catchError(this.handleError));
    };
    post = <T>(path: string, body?: unknown, params?: HttpParams): Observable<T> => {
        return this.client.post(`${environment.api_url}/${path}`, body, { params: params }).pipe(catchError(this.handleError));
    };
    patch = <T>(path: string, body?: unknown, params?: HttpParams): Observable<T> => {
        return this.client
            .patch<T>(`${environment.api_url}/${path}`, body, { params: params })
            .pipe(catchError(this.handleError));
    };
    put = <T>(path: string, body?: unknown, params?: HttpParams): Observable<T> => {
        return this.client.put<T>(`${environment.api_url}/${path}`, body, { params: params }).pipe(catchError(this.handleError));
    };
    delete = <T>(path: string, params?: HttpParams): Observable<T> => {
        return this.client.delete<T>(`${environment.api_url}/${path}`, { params: params }).pipe(catchError(this.handleError));
    };

    uploadFile = (path: string, formData: FormData): Observable<HttpEvent<unknown>> => {
        return this.client
            .post(`${environment.api_url}/${path}`, formData, { reportProgress: true, observe: 'events' })
            .pipe(catchError(this.handleError));
    };
}
