import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@models/';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    get = (id: number): Observable<User> => {
        return this.apiService.get(`user/get/${id}`);
    };
    update = (id: number, body: User): Observable<number> => {
        return this.apiService.patch(`user/update/${id}`, body);
    };
}
