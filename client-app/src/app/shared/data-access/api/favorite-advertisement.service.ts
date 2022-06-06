import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteAdvertisement } from '../models/api/favorite-advertisement.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class FavoriteAdvertisementService {
    constructor(private apiService: ApiService) {}

    getByUser = (userId: number): Observable<FavoriteAdvertisement[]> => {
        return this.apiService.get(`favoriteadvertisement/get/${userId}`);
    };
    isFavorite = (userId: number, advertisementId: number): Observable<boolean> => {
        let params = new HttpParams();
        params = params.set('userId', userId);
        params = params.set('advertisementId', advertisementId);
        return this.apiService.get(`favoriteadvertisement/is-favorite`, params);
    };
    create = (userId: number, advertisementId: number): Observable<any> => {
        let params = new HttpParams();
        params = params.set('userId', userId);
        params = params.set('advertisementId', advertisementId);
        return this.apiService.post(`favoriteadvertisement/add`, {}, params);
    };
    delete = (userId: number, advertisementId: number): Observable<any> => {
        let params = new HttpParams();
        params = params.set('userId', userId);
        params = params.set('advertisementId', advertisementId);
        return this.apiService.delete(`favoriteadvertisement/delete`, params);
    };
}
