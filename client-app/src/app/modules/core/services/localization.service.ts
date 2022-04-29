import { Injectable } from '@angular/core';
import { Localization } from 'src/app/shared/data-access/models';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor(private apiService: ApiService) {}

    getManyByUser = (userId: number): ObservableResponse<Array<Localization>> => {
        return this.apiService.get<Array<Localization>>(`localization/get-many-by-user/${userId}`);
    };

    create = (body: Localization, userId: number): ObservableResponse<Localization> => {
        return this.apiService.put<Localization>(`localization/create-for-user/${userId}`, body);
    };
}
