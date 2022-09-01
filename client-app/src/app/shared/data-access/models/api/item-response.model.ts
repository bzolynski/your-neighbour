import { Image, Category } from '@models/';

export interface IItem {
    id: number;
    name: string;
    categoryId: number;
    category: Category;
    description: string;
    images: Image[];
}
