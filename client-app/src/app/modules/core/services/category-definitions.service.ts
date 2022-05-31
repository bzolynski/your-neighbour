import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategoryDefinition } from 'src/app/shared/data-access/models';
import { ApiService } from './';

@Injectable({
    providedIn: 'root',
})
export class CategoryDefinitionsService {
    constructor(private apiService: ApiService) {}

    changed: Subject<void> = new Subject<void>();
    getById = (id: number): Observable<ICategoryDefinition> => {
        return this.apiService.get<ICategoryDefinition>(`categoryDefinition/get/${id}`);
    };
    getAll = (): Observable<ICategoryDefinition[]> => {
        return this.apiService.get<ICategoryDefinition[]>('categoryDefinition/get');
    };
    create = (body: ICategoryDefinition): Observable<number> => {
        return this.apiService.put<number>('categoryDefinition/create', body);
    };
    update = (id: number, body: ICategoryDefinition): Observable<number> => {
        return this.apiService.post<number>(`categoryDefinition/update/${id}`, body);
    };
    delete = (id: number): Observable<any> => {
        return this.apiService.delete<any>(`categoryDefinition/delete/${id}`);
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
