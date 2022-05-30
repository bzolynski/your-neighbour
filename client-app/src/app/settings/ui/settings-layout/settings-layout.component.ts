import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-settings-layout',
    templateUrl: './settings-layout.component.html',
    styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent {
    @ViewChild('sideContentContainer', { static: true }) sideContentContainer!: ElementRef<HTMLElement>;
    @Input() set expanded(value: boolean | null) {
        this.expanded$.next(value ?? false);
    }
    @Input() set sideContentWidth(value: string) {
        this.width$.next(value);
    }
    expanded$ = new BehaviorSubject<boolean>(false);
    width$ = new BehaviorSubject<string>('600px');
    contentWidth$ = combineLatest([this.expanded$.asObservable(), this.width$.asObservable()]).pipe(
        mergeMap(([expanded, width]) =>
            iif(
                () => expanded,
                of(width).pipe(tap(() => this.renderer.addClass(this.sideContentContainer.nativeElement, 'expanded'))),
                of('0').pipe(tap(() => this.renderer.removeClass(this.sideContentContainer.nativeElement, 'expanded')))
            )
        )
    );
    constructor(private renderer: Renderer2) {}
}
