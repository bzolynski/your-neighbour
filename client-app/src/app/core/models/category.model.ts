import { BaseModel, CategoryDefinition } from '.';

export const ROOT_CATEGORY_GUID = '00000000-0000-0000-0000-000000000000';

export interface Category extends BaseModel {
    name: string;
    definition: CategoryDefinition;
    isActive: boolean;
    parent?: Category;
    children?: Category[];
    parentId: number;
    parentGuid: string;

    definitionId: number;
}
