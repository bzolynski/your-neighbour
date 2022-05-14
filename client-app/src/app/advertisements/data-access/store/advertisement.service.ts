import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/data-access/api/api.service';
import { HttpHelperMethods, QueryParams } from 'src/app/shared/utils';
import { Advertisement } from '../models/advertisement.model';

export interface GetAdvertisementQueryParams extends QueryParams {
    includeUser?: boolean;
    includeLocalization?: boolean;
    includeDefinition?: boolean;
    includeCategory?: boolean;
    includeImages?: boolean;
    maxImages?: number;
    search?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AdvertisementService {
    constructor(private apiService: ApiService) {}

    create = (advertisement: Advertisement, userId: number): Observable<number> => {
        return this.apiService.post<number>(`advertisement/create/${userId}`, advertisement);
    };
    update = (id: number, advertisement: Advertisement): Observable<number> => {
        return this.apiService.put<number>(`advertisement/update/${id}`, advertisement);
    };
    get = (id: number, queryParams?: GetAdvertisementQueryParams): Observable<Advertisement> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Advertisement>(`advertisement/get/${id}`, params);
    };
    getMany = (queryParams?: GetAdvertisementQueryParams): Observable<Advertisement[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Advertisement[]>(`advertisement/get`, params);
    };
    getManyByCategory = (categoryId: number, queryParams?: GetAdvertisementQueryParams): Observable<Advertisement[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Advertisement[]>(`advertisement/get-by-category/${categoryId}`, params);
    };

    getManyByUser = (userId: number, queryParams?: GetAdvertisementQueryParams): Observable<Advertisement[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Advertisement[]>(`advertisement/get-by-user/${userId}`, params);
    };

    delete = (id: number): Observable<boolean> => {
        return this.apiService.delete<boolean>(`advertisement/delete/${id}`);
    };
}
