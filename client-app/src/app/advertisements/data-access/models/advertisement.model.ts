import { ICategory, IItem, Localization, IModelBase } from 'src/app/shared/data-access/models';

export interface Advertisement extends IModelBase {
    //user
    dateCreated: Date;
    category: ICategory;
    //definition :
    localization: Localization;
    item: IItem;
}
