import { ICategoryDefinition, IModelBase } from '.';

export interface ICategory extends IModelBase {
	name: string;
	definition: ICategoryDefinition;
	parent: ICategory;
	subcategories: Array<ICategory>;
	isActive: boolean;
}
