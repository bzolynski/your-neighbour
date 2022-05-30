import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, merge, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
    loadDefinitions,
    selectDefinitions,
    selectError,
    selectStatus,
} from '../../data-access/store/settings-category-definitions';

@Component({
    selector: 'app-settings-category-definitions',
    templateUrl: './settings-category-definitions.component.html',
    styleUrls: ['./settings-category-definitions.component.scss'],
})
export class SettingsCategoryDefinitionsComponent implements OnInit {
    definitions$ = this.store.select(selectDefinitions);
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);

    expanded$ = merge(of(undefined), this.router.events).pipe(
        switchMap((value) =>
            iif(
                () => value === undefined,
                (this.route.firstChild?.url ?? this.route.url).pipe(map((segmets) => segmets.length > 0)),
                of(value).pipe(
                    filter((e): e is NavigationEnd => e !== null && e instanceof NavigationEnd),
                    map(() => (this.route.firstChild ? true : false))
                )
            )
        )
    );

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.store.dispatch(loadDefinitions());
    }
}
