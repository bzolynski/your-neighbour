export enum ResponseStatus {
	success,
	error
}

export interface Response<T> {
	errorMessage: string;
	responseObject: T;
	responseStatus: ResponseStatus;
}
