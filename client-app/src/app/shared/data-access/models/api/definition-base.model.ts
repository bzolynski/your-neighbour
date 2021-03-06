import { IModelBase } from './base.model';

export interface IDefinitionBase extends IModelBase {
    name: string;
    displayName: string;
    isActive: boolean;
}
