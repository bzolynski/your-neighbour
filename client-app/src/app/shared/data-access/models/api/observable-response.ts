import { Observable } from 'rxjs';
import { Response } from './response.model';

export class ObservableResponse<T> extends Observable<Response<T>> {}
