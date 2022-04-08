import { IImage } from '../models/image.model';

// interfaces
export interface IItemCreateDto {
    userId: number;
    name: string;
    description: string;
    categoryId: number;
    images: IImage[];
}
// classes

export class ItemCreateDto implements IItemCreateDto {
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
