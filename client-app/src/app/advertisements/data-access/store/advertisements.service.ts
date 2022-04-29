import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/data-access/api/api.service';
import { Advertisement, ObservableResponse } from 'src/app/shared/data-access/models';

@Injectable({
    providedIn: 'root',
})
export class AdvertisementsService {
    constructor(private apiService: ApiService) {}

    create = (advertisement: Advertisement): ObservableResponse<number> => {
        return this.apiService.post<number>('advertisement/create', advertisement);
    };
}
