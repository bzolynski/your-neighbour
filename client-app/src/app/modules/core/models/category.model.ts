import { ICategoryDefinition, IModelBase } from '.';

export interface ICategory extends IModelBase {
    name: string;
    definition: ICategoryDefinition;
    isActive: boolean;
    parentId: number;
    parentGuid: string;
}
