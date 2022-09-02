import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category, ROOT_CATEGORY_GUID } from '@models/category.model';
import { HttpHelperMethods, QueryParams } from 'src/app/shared/utils';
import { ApiService } from '.';
import { IChildParentPair } from '@app-types/.';

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

    getMany = (queryParams?: CategoryQueryParams): Observable<Category[]> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Category[]>('category/get', params);
    };
    get = (id: number, queryParams?: CategoryQueryParams): Observable<Category> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Category>(`category/get/${id}`, params);
    };
    getRoot = (queryParams?: CategoryQueryParams): Observable<Category> => {
        const params = HttpHelperMethods.mapToHttpParams(queryParams);
        return this.apiService.get<Category>(`category/get-by-guid/${ROOT_CATEGORY_GUID}`, params);
    };
    create = (body: Category): Observable<number> => {
        return this.apiService.post<number>(`category/create/`, body);
    };
    update = (id: number, body: Category): Observable<number> => {
        return this.apiService.put<number>(`category/update/${id}`, body);
    };
    delete = (id: number): Observable<boolean> => {
        return this.apiService.delete<boolean>(`category/delete/${id}`);
    };
    changeParent = (childParentPairs: Array<IChildParentPair>): Observable<boolean> => {
        return this.apiService.patch<boolean>(`category/change-parent/`, childParentPairs);
    };
    getUnassigned = (): Observable<Array<Category>> => {
        return this.apiService.get<Array<Category>>('category/get-unassigned');
    };
}
