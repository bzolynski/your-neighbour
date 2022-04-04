import { Injectable } from '@angular/core';
import { ILocalizationCreateDto, ILocalizationDto } from '../dtos';
import { ObservableResponse } from '../types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationServiceService {
    constructor(private apiService: ApiService) {}

    create = (body: ILocalizationCreateDto): ObservableResponse<ILocalizationDto> => {
        return this.apiService.put<ILocalizationDto>('localizaiton/create-for-user', body);
    };
}
