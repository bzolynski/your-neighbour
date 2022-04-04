export interface ICoordinates {
    longitude: number;
    latitude: number;
}

export interface ILocalization {
    coordinates: ICoordinates;
    address: string;
}
