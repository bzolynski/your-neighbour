import { IModelBase } from './base.model';
import { ICategoryDefinition } from './category-definition-response.model';

export const ROOT_CATEGORY_GUID = '00000000-0000-0000-0000-000000000000';

export interface ICategory extends IModelBase {
    name: string;
    definition: ICategoryDefinition;
    isActive: boolean;
    parentId: number;
    parentGuid: string;
}
