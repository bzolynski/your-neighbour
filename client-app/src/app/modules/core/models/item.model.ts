import { ICategory } from './category.model';
import { IImage } from './image.model';

export interface IItem {
    name: string;
    category: ICategory;
    description: string;
    images: IImage[];
}
