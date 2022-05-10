import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/data-access/models';
import { HttpHelperMethods, QueryParams } from 'src/app/shared/utils';
import { IImage } from '../models/image.model';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

export interface GetItemQueryParams extends QueryParams {
    includeCategory?: boolean;
    includeUser?: boolean;
    includeImages?: boolean;
    maxImages?: number;
}

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private apiService: ApiService) {}

    create = (body: IItem, userId: number): ObservableResponse<number> => {
        return this.apiService.put<number>(`item/create-for-user/${userId}`, body);
    };

    getByUser = (userId: number, queryParams?: GetItemQueryParams): ObservableResponse<IItem[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<IItem[]>(`item/get-many-by-user/${userId}`, params);
    };

    getImagesByItem = (itemId: number): ObservableResponse<IImage[]> => {
        return this.apiService.get<IImage[]>(`item/get-many-images-by-item/${itemId}`);
    };

    get = (itemId: number, queryParams?: GetItemQueryParams): ObservableResponse<IItem> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<IItem>(`item/get/${itemId}`, params);
    };
}
