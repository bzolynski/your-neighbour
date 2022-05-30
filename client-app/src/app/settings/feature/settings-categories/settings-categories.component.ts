import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, merge, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
    loadCategories,
    selectCategories,
    selectError,
    selectSidePanelWidth,
    selectStatus,
    setSidePanelWitdh,
} from '../../data-access/store/settings-categories';

@Component({
    selector: 'app-settings-categories',
    templateUrl: './settings-categories.component.html',
    styleUrls: ['./settings-categories.component.scss'],
})
export class SettingsCategoriesComponent implements OnInit {
    categories$ = this.store.select(selectCategories);
    status$ = this.store.select(selectStatus);
    error$ = this.store.select(selectError);
    sidePanelWidth$ = this.store.select(selectSidePanelWidth);

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
        this.store.dispatch(loadCategories());
    }
    triggerRouter = (route: any[], width: string = '600px') => {
        this.router.navigate(route, { relativeTo: this.route });
        this.store.dispatch(setSidePanelWitdh({ width: width }));
    };
}
