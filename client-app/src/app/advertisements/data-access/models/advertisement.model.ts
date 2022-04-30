import { ICategory, IItem, Localization, IModelBase, AdvertisementDefinition, IUser } from 'src/app/shared/data-access/models';

export interface Advertisement extends IModelBase {
    user: IUser;
    dateCreated: Date;
    category: ICategory;
    definition: AdvertisementDefinition;
    localization: Localization;
    item: IItem;
}
