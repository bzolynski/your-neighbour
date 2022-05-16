import { ICategory } from './category.model';
import { IImage } from './image.model';

export interface IItem {
    id: number;
    name: string;
    category: ICategory;
    categoryId: number;
    description: string;
    images: IImage[];
}

export interface IItemListing {
    id: number;
    name: string;
    category: ICategory;
}

export interface IItemDetails {
    id: number;
    name: string;
    category: ICategory;
    description: string;
}
