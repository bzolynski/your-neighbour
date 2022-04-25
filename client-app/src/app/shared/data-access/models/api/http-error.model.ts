import { HttpErrorResponse } from '@angular/common/http';

export interface HttpError<T = any> extends HttpErrorResponse {
    error: T | null;
}
