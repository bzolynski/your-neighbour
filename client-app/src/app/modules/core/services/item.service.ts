import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCreateDto, ItemDetailsDto, ItemDto, ItemListingDto } from '../dtos/item.dto';
import { IImage } from '../models/image.model';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    create = (body: ItemCreateDto): ObservableResponse<string> => {
        return this.apiService.put<string>('item/create', body);
        //return this.httpClient.put<string>('https://localhost:5001/api/item/create', body);
    };

    getByUser = (userId: number): ObservableResponse<ItemDto[]> => {
        return this.apiService.get<ItemDto[]>(`item/get-many-by-user/${userId}`);
    };

    getListingByUser = (userId: number): ObservableResponse<ItemListingDto[]> => {
        return this.apiService.get<ItemListingDto[]>(`item/get-listing-by-user/${userId}`);
    };

    getImagesByItem = (itemId: number): ObservableResponse<IImage[]> => {
        return this.apiService.get<IImage[]>(`item/get-many-images-by-item/${itemId}`);
    };
    getDetails = (itemId: number): ObservableResponse<ItemDetailsDto> => {
        return this.apiService.get<ItemDetailsDto>(`item/get-details/${itemId}`);
    };
}
