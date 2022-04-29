import { ICategory, IUser, Localization, IItem } from './';
import { AdvertisementDefinition } from './advertisement-definition.model';

export interface Advertisement {
    user: IUser;
    dateCreated: Date;
    category: ICategory;
    definition: AdvertisementDefinition;
    localization: Localization;
    item: IItem;
}
