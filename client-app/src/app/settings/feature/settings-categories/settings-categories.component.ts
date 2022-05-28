import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, merge, of, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { loadCategories, selectCategories, selectError, selectStatus } from '../../data-access/store/settings-categories';

@Component({
    selector: 'app-settings-categories',
    templateUrl: './settings-categories.component.html',
    styleUrls: ['./settings-categories.component.scss'],
})
export class SettingsCategoriesComponent implements OnInit {
    categories$ = this.store.select(selectCategories);
    status$ = this.store.select(selectStatus);
    error$ = this.store.select(selectError);
    trigger$ = new ReplaySubject<any[]>(1);
    expanded$ = merge(this.trigger$.asObservable(), of(this.route.firstChild)).pipe(
        switchMap((merged) =>
            iif(
                () => Array.isArray(merged),
                of(merged as any[]).pipe(
                    map((route) => route.map((value) => String(value)).join('/')),
                    switchMap((route) =>
                        of(this.router.url.indexOf(route) === -1).pipe(
                            tap((result) => {
                                if (!result) this.router.navigate(['.'], { relativeTo: this.route });
                                else this.router.navigate([route], { relativeTo: this.route });
                            })
                        )
                    )
                ),
                of(merged).pipe(
                    filter((child): child is ActivatedRoute => true),
                    switchMap((child) =>
                        child ? child.url.pipe(map((segments) => segments.map((value) => value.path))) : of([])
                    ),
                    map((route) => route.map((value) => String(value)).join('/')),
                    switchMap((route) =>
                        iif(
                            () => route !== '',
                            of(route).pipe(
                                tap((route) => this.router.navigate([route], { relativeTo: this.route })),
                                map(() => true)
                            ),
                            of(false)
                        )
                    )
                )
            )
        )
    );

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.store.dispatch(loadCategories());
    }
}
