import { ICategory, IItem, ILocalization, IModelBase } from 'src/app/shared/data-access/models';

export interface Advertisement extends IModelBase {
    //user
    dateCreated: Date;
    category: ICategory;
    //definition :
    localization: ILocalization;
    item: IItem;
}
