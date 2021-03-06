import { IModelBase } from './model-base.model';

export interface IDefinitionBase extends IModelBase {
	name: string;
	displayName: string;
	isActive: boolean;
}
export interface IDefinitionCreate {
	name: string;
	displayName: string;
	isActive: boolean;
}
