import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemCreateDto } from '../dtos/item.dto';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    create = (body: IItemCreateDto): Observable<string> => {
        // return this.apiService.put<string>('item/create', body);
        return this.httpClient.put<string>('https://localhost:5001/api/item/create', body);
    };
}
