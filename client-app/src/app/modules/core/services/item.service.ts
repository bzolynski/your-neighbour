import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItemCreateDto } from '../dtos/item.dto';
import { IItem } from '../models/item.model';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    create = (body: IItemCreateDto): ObservableResponse<string> => {
        return this.apiService.put<string>('item/create', body);
        //return this.httpClient.put<string>('https://localhost:5001/api/item/create', body);
    };

    getByUser = (userId: number): ObservableResponse<IItem[]> => {
        console.log('userId');
        console.log(userId);

        return this.apiService.get<IItem[]>(`item/get-many-by-user/${userId}`);
    };
}
