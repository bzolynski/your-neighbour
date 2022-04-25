import { ICoordinates, ILocalization } from 'src/app/shared/data-access/models';
import { IResponseDtoBase } from '.';

// interfaces
export interface ICoordinatesDto {
    longitude: number;
    latitude: number;
}

export interface ILocalizationCreateDto {
    userId: number;
    address: string;
    coordinates: ICoordinatesDto;
}

export interface ILocalizationDto extends IResponseDtoBase<ILocalization> {
    address: string;
    coordinates: ICoordinatesDto;
}

// classes
export class CoordinatesDto implements ICoordinatesDto {
    longitude: number;
    latitude: number;
    constructor(coordinates: ICoordinates) {
        this.longitude = coordinates.longitude;
        this.latitude = coordinates.latitude;
    }
}
export class LocalizationCreateDto implements ILocalizationCreateDto {
    userId: number;
    address: string;
    coordinates: ICoordinatesDto;

    constructor(localization: ILocalization, userId: number) {
        this.userId = userId;
        this.address = localization.address;
        this.coordinates = new CoordinatesDto(localization.coordinates);
    }
}
export class LocalizationDto implements ILocalizationDto {
    address!: string;
    coordinates!: ICoordinatesDto;

    private constructor() {}

    mapToModel = (): ILocalization => {
        return { address: this.address, coordinates: this.coordinates };
    };
}
