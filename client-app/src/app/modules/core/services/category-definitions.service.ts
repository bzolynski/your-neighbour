import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategoryDefinition } from '../models';
import { ObservableResponse } from '../types';
import { ApiService } from './';

@Injectable({
	providedIn: 'root'
})
export class CategoryDefinitionsService {
	constructor(private apiService: ApiService) {}

	changed: Subject<void> = new Subject<void>();
	getById = (id: number): ObservableResponse<ICategoryDefinition> => {
		return this.apiService.get<ICategoryDefinition>(`categoryDefinition/getById/${id}`);
	};
	getByGuid = (guid: string): ObservableResponse<ICategoryDefinition> => {
		return this.apiService.get<ICategoryDefinition>(`categoryDefinition/getByGuid/${guid}`);
	};
	getAll = (): ObservableResponse<Array<ICategoryDefinition>> => {
		return this.apiService.get<Array<ICategoryDefinition>>('categoryDefinition/getAll');
	};
	create = (body: ICategoryDefinition): ObservableResponse<ICategoryDefinition> => {
		return this.apiService.put<ICategoryDefinition>('categoryDefinition/create', body);
	};
	update = (id: number, body: ICategoryDefinition): ObservableResponse<ICategoryDefinition> => {
		return this.apiService.post<ICategoryDefinition>(`categoryDefinition/update/${id}`, body);
	};
	delete = (id: number): ObservableResponse<boolean> => {
		return this.apiService.delete<boolean>(`categoryDefinition/delete/${id}`);
	};
	checkNameExists = (name: string): ObservableResponse<boolean> => {
		const params = new HttpParams().set('name', name);
		return this.apiService.get<boolean>(`categoryDefinition/nameExists`, params);
	};
	checkDisplayNameExists = (displayName: string): ObservableResponse<boolean> => {
		const params = new HttpParams().set('displayName', displayName);
		return this.apiService.get<boolean>(`categoryDefinition/displayNameExists`, params);
	};
}
