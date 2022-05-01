import { HttpParams } from '@angular/common/http';

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
}
