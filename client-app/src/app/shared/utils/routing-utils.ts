import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RoutingHelperMethods {
    static combineParams = (route: ActivatedRoute): Observable<Params> => {
        return combineLatest([route.params, route.queryParams]).pipe(
            map(([params, queryParams]) => ({ ...params, ...queryParams }))
        );
    };
}
