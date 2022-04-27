import { Injectable } from '@angular/core';
import { ILocalization } from 'src/app/shared/data-access/models';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor(private apiService: ApiService) {}

    getManyByUser = (userId: number): ObservableResponse<Array<ILocalization>> => {
        return this.apiService.get<Array<ILocalization>>(`localization/get-many-by-user/${userId}`);
    };

    create = (body: ILocalization, userId: number): ObservableResponse<ILocalization> => {
        return this.apiService.put<ILocalization>(`localization/create-for-user/${userId}`, body);
    };
}
