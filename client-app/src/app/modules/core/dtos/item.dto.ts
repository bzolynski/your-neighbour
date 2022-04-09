import { ICategory } from '../models';
import { IImage } from '../models/image.model';
import { IItem, IItemDetails, IItemListing } from '../models/item.model';

export class ItemCreateDto {
    userId: number;
    name: string;
    description: string;
    categoryId: number;
    images: IImage[];

    constructor(userId: number, name: string, description: string, categoryId: number, images: IImage[]) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.images = images;
    }
}

export class ItemDto {
    id: number;
    name: string;
    description: string;
    category: ICategory;
    images: IImage[];

    private constructor(id: number, name: string, description: string, category: ICategory, images: IImage[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.images = images;
    }

    mapToItem = (): IItem => {
        return {
            id: this.id,
            category: this.category,
            description: this.description,
            name: this.name,
            images: this.images,
        };
    };
}

export class ItemListingDto {
    id: number;
    name: string;
    category: ICategory;

    private constructor(id: number, name: string, category: ICategory) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    mapToItem = (): IItemListing => {
        return {
            id: this.id,
            category: this.category,
            name: this.name,
        };
    };
}
export class ItemDetailsDto {
    id: number;
    name: string;
    category: ICategory;
    description: string;

    private constructor(id: number, name: string, category: ICategory, description: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
    }

    mapToItem = (): IItemDetails => {
        return {
            id: this.id,
            category: this.category,
            name: this.name,
            description: this.description,
        };
    };
}
