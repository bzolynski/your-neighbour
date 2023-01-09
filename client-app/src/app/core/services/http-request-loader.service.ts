import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestLoaderService {
    private setLoading$ = new ReplaySubject<boolean>(1);
    isLoading$: Observable<boolean> = this.setLoading$.asObservable();
    constructor() {}
    setLoading(loading: boolean) {
        this.setLoading$.next(loading);
    }
}
