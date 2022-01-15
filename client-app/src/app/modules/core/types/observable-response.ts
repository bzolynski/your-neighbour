import { Observable } from 'rxjs';
import { Response } from '../models';

export class ObservableResponse<T> extends Observable<Response<T>> {}
