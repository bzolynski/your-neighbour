import { Injectable } from '@angular/core';
import { AdvertisementDefinition, ObservableResponse } from '../models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AdvertisementDefinitionService {
    constructor(private apiService: ApiService) {}

    getMany = (): ObservableResponse<AdvertisementDefinition[]> => {
        return this.apiService.get('advertisementdefinition/get');
    };
}
