import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHelperMethods, QueryParams } from 'src/app/shared/utils';
import { ApiService } from '.';
import { ICategory } from '../models';
import { ObservableResponse } from '../types';
import { IChildParentPair } from '../types/child-parent-pair.type';

export interface CategoryQueryParams extends QueryParams {
    includeDefinition: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private apiService: ApiService) {}

    changed: Subject<void> = new Subject<void>();

    getMany = (queryParams?: CategoryQueryParams): ObservableResponse<ICategory[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<ICategory[]>('category/get-many', params);
    };
    get = (id: number, queryParams?: CategoryQueryParams): ObservableResponse<ICategory> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<ICategory>(`category/get/${id}`, params);
    };
    create = (body: ICategory): ObservableResponse<ICategory> => {
        return this.apiService.put<ICategory>(`category/create/`, body);
    };
    delete = (id: number): ObservableResponse<boolean> => {
        return this.apiService.delete<boolean>(`category/delete/${id}`);
    };
    changeParent = (childParentPairs: Array<IChildParentPair>): ObservableResponse<boolean> => {
        return this.apiService.patch<boolean>(`category/change-parent/`, childParentPairs);
    };
    getUnassigned = (): ObservableResponse<Array<ICategory>> => {
        return this.apiService.get<Array<ICategory>>('category/get-unassigned');
    };
}
