import { HttpEvent, HttpEventType, HttpParams, HttpProgressEvent, HttpResponse } from '@angular/common/http';

export type QueryParams = Object; // eslint-disable-line

export class HttpHelperMethods {
    static mapToHttpParams = (queryParams?: QueryParams): HttpParams => {
        let params = new HttpParams();
        if (queryParams) {
            for (const [key, value] of Object.entries(queryParams)) {
                params = params.set(key, value);
            }
        }
        return params;
    };

    static isHttpResponse = <T>(event: HttpEvent<T>): event is HttpResponse<T> => {
        return event.type === HttpEventType.Response;
    };
    static isHttpProgressEvent = (event: HttpEvent<unknown>): event is HttpProgressEvent => {
        return event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.UploadProgress;
    };
}
