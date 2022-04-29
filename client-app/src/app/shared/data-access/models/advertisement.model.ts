import { ICategory, IUser, ILocalization, IItem } from './';
import { AdvertisementDefinition } from './advertisement-definition.model';

export interface Advertisement {
    user: IUser;
    dateCreated: Date;
    category: ICategory;
    definition: AdvertisementDefinition;
    localization: ILocalization;
    item: IItem;
}
