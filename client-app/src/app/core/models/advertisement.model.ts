import { IItem } from 'src/app/shared/data-access/models';
import { BaseModel, Category, AdvertisementDefinition, Localization, Image, User } from '.';
export interface Advertisement extends BaseModel {
    title: string;
    description: string;
    dateCreated: Date;
    user: User;
    definition: AdvertisementDefinition;
    localization: Localization;
    category: Category;
    images: Image[];

    item: IItem;

    userId: number;
    definitionId: number;
    localizationId: number;
    categoryId: number;
}
