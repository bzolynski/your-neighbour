import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-welcome-landing-page',
    templateUrl: './welcome-landing-page.component.html',
    styleUrls: ['./welcome-landing-page.component.scss'],
})
export class WelcomeLandingPageComponent implements OnInit, OnDestroy {
    selectedIndex: number = 0;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.fragment
            .pipe(takeUntil(this.destroy$))
            .subscribe((fragment) => {
                if (fragment) {
                    this.selectedIndex = fragment === 'register' ? 1 : 0;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
