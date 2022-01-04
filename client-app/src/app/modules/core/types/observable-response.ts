import { Observable } from 'rxjs';
import { Response } from '../models';

export default class ObservableResponse<T> extends Observable<Response<T>> {}
