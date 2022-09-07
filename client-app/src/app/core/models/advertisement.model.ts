import { BaseModel, Category, AdvertisementDefinition, Localization, User, AdvertisementImage } from '.';
export interface Advertisement extends BaseModel {
    title: string;
    description: string;
    dateCreated: Date;
    user: User;
    definition: AdvertisementDefinition;
    localization: Localization;
    category: Category;
    images: AdvertisementImage[];

    userId: number;
    definitionId: number;
    localizationId: number;
    categoryId: number;
}
