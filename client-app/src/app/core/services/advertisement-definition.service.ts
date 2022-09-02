import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementDefinition } from '@models/';
import { ApiService } from './';

@Injectable({
    providedIn: 'root',
})
export class AdvertisementDefinitionService {
    constructor(private apiService: ApiService) {}

    getMany = (): Observable<AdvertisementDefinition[]> => {
        return this.apiService.get('advertisementdefinition/get');
    };
}
