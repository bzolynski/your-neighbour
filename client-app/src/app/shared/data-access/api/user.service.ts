import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    get = (id: number): Observable<IUser> => {
        return this.apiService.get(`user/get/${id}`);
    };
    update = (id: number, body: IUser): Observable<number> => {
        return this.apiService.put(`user/update/${id}`, body);
    };
}
