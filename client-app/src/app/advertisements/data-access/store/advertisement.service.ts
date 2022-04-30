import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/data-access/api/api.service';
import { ObservableResponse } from 'src/app/shared/data-access/models';
import { Advertisement } from '../models/advertisement.model';

@Injectable({
    providedIn: 'root',
})
export class AdvertisementService {
    constructor(private apiService: ApiService) {}

    create = (advertisement: Advertisement, userId: number): ObservableResponse<number> => {
        return this.apiService.post<number>(`advertisement/create/${userId}`, advertisement);
    };
}
