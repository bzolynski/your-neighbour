import { IItem, Localization, IModelBase, AdvertisementDefinition, IUser } from 'src/app/shared/data-access/models';

export interface Advertisement extends IModelBase {
    user: IUser;
    definition: AdvertisementDefinition;
    localization: Localization;
    item: IItem;
    dateCreated: Date;
    description: string;
}
