import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localization } from 'src/app/shared/data-access/models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor(private apiService: ApiService) {}

    getManyByUser = (userId: number): Observable<Localization[]> => {
        return this.apiService.get<Localization[]>(`localization/get-many-by-user/${userId}`);
    };

    get = (id: number): Observable<Localization> => {
        return this.apiService.get<Localization>(`localization/get/${id}`);
    };

    create = (body: Localization, userId: number): Observable<number> => {
        return this.apiService.put<number>(`localization/create-for-user/${userId}`, body);
    };
}
