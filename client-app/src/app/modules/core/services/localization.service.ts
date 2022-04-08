import { Injectable } from '@angular/core';
import { ILocalizationCreateDto, ILocalizationDto } from '../dtos';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor(private apiService: ApiService) {}

    getManyByUser = (userId: number): ObservableResponse<Array<ILocalizationDto>> => {
        return this.apiService.get<Array<ILocalizationDto>>(`localization/get-many-by-user/${userId}`);
    };

    create = (body: ILocalizationCreateDto): ObservableResponse<ILocalizationDto> => {
        return this.apiService.put<ILocalizationDto>('localization/create-for-user', body);
    };
}
