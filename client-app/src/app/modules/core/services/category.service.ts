import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategory } from 'src/app/shared/data-access/models';
import { HttpHelperMethods, QueryParams } from 'src/app/shared/utils';
import { ApiService } from '.';
import { ROOT_CATEGORY_GUID } from '../models';
import { IChildParentPair } from '../types/child-parent-pair.type';

export interface CategoryQueryParams extends QueryParams {
    includeDefinition?: boolean;
    includeParent?: boolean;
    includeChildren?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private apiService: ApiService) {}

    changed: Subject<void> = new Subject<void>();

    getMany = (queryParams?: CategoryQueryParams): Observable<ICategory[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<ICategory[]>('category/get', params);
    };
    get = (id: number, queryParams?: CategoryQueryParams): Observable<ICategory> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<ICategory>(`category/get/${id}`, params);
    };
    getRoot = (queryParams?: CategoryQueryParams): Observable<ICategory> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<ICategory>(`category/get-by-guid/${ROOT_CATEGORY_GUID}`, params);
    };
    create = (body: ICategory): Observable<ICategory> => {
        return this.apiService.post<ICategory>(`category/create/`, body);
    };
    update = (id: number, body: ICategory): Observable<ICategory> => {
        return this.apiService.put<ICategory>(`category/update/${id}`, body);
    };
    delete = (id: number): Observable<boolean> => {
        return this.apiService.delete<boolean>(`category/delete/${id}`);
    };
    changeParent = (childParentPairs: Array<IChildParentPair>): Observable<boolean> => {
        return this.apiService.patch<boolean>(`category/change-parent/`, childParentPairs);
    };
    getUnassigned = (): Observable<Array<ICategory>> => {
        return this.apiService.get<Array<ICategory>>('category/get-unassigned');
    };
}
