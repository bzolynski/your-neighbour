import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpError, ObservableResponse } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private client: HttpClient) {}

    private handleError = (httpError: HttpError<Response>, caught: Observable<any>) => {
        // for ex: logs
        console.log(httpError);

        return throwError(httpError);
    };

    get = <T>(path: string, params?: HttpParams): ObservableResponse<T> => {
        return this.client.get<T>(`${environment.api_url}/${path}`, { params: params }).pipe(catchError(this.handleError));
    };
    post = <T>(path: string, body: unknown): ObservableResponse<T> => {
        return this.client.post<T>(`${environment.api_url}/${path}`, body).pipe(catchError(this.handleError));
    };
    patch = <T>(path: string, body?: unknown): ObservableResponse<T> => {
        return this.client.patch<T>(`${environment.api_url}/${path}`, body).pipe(catchError(this.handleError));
    };
    put = <T>(path: string, body: unknown): ObservableResponse<T> => {
        return this.client.put<T>(`${environment.api_url}/${path}`, body).pipe(catchError(this.handleError));
    };
    delete = <T>(path: string): ObservableResponse<T> => {
        return this.client.delete<T>(`${environment.api_url}/${path}`).pipe(catchError(this.handleError));
    };
}