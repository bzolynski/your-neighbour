import { ICategoryDefinition, IModelBase } from '.';

export const ROOT_CATEGORY_GUID = '00000000-0000-0000-0000-000000000000';

export interface ICategory extends IModelBase {
    name: string;
    definition: ICategoryDefinition;
    isActive: boolean;
    parentId: number;
    parentGuid: string;
}
