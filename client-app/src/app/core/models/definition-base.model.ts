import { BaseModel } from './base.model';

export interface DefinitionBase extends BaseModel {
    name: string;
    displayName: string;
    isActive: boolean;
}
