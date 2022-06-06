import { IItem, Localization, IModelBase, AdvertisementDefinition } from 'src/app/shared/data-access/models';

export interface Advertisement extends IModelBase {
    //user: IUser;
    definition: AdvertisementDefinition;
    localization: Localization;
    item: IItem;
    dateCreated: Date;
    title: string;
    description: string;

    userId: number;
}
