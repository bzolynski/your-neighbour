export enum ResponseStatus {
    success,
    error,
}

export interface Response<T = any> {
    errorMessages: Array<string>;
    responseObject: T;
    responseStatus: ResponseStatus;
}
