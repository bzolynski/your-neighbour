import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategoryDefinition } from '../models';
import { ApiService } from './';

@Injectable({
    providedIn: 'root',
})
export class CategoryDefinitionsService {
    constructor(private apiService: ApiService) {}

    changed: Subject<void> = new Subject<void>();
    getById = (id: number): Observable<ICategoryDefinition> => {
        return this.apiService.get<ICategoryDefinition>(`categoryDefinition/getById/${id}`);
    };
    getByGuid = (guid: string): Observable<ICategoryDefinition> => {
        return this.apiService.get<ICategoryDefinition>(`categoryDefinition/getByGuid/${guid}`);
    };
    getAll = (): Observable<Array<ICategoryDefinition>> => {
        return this.apiService.get<Array<ICategoryDefinition>>('categoryDefinition/getAll');
    };
    create = (body: ICategoryDefinition): Observable<ICategoryDefinition> => {
        return this.apiService.put<ICategoryDefinition>('categoryDefinition/create', body);
    };
    update = (id: number, body: ICategoryDefinition): Observable<ICategoryDefinition> => {
        return this.apiService.post<ICategoryDefinition>(`categoryDefinition/update/${id}`, body);
    };
    delete = (id: number): Observable<boolean> => {
        return this.apiService.delete<boolean>(`categoryDefinition/delete/${id}`);
    };
    checkNameExists = (name: string): Observable<boolean> => {
        const params = new HttpParams().set('name', name);
        return this.apiService.get<boolean>(`categoryDefinition/nameExists`, params);
    };
    checkDisplayNameExists = (displayName: string): Observable<boolean> => {
        const params = new HttpParams().set('displayName', displayName);
        return this.apiService.get<boolean>(`categoryDefinition/displayNameExists`, params);
    };
}
