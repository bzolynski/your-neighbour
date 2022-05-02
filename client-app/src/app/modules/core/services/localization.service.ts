import { Injectable } from '@angular/core';
import { Localization } from 'src/app/shared/data-access/models';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor(private apiService: ApiService) {}

    getManyByUser = (userId: number): ObservableResponse<Localization[]> => {
        return this.apiService.get<Localization[]>(`localization/get-many-by-user/${userId}`);
    };

    get = (id: number): ObservableResponse<Localization> => {
        return this.apiService.get<Localization>(`localization/get/${id}`);
    };

    create = (body: Localization, userId: number): ObservableResponse<number> => {
        return this.apiService.put<number>(`localization/create-for-user/${userId}`, body);
    };
}
