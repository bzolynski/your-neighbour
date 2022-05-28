import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-settings-layout-router',
    templateUrl: './settings-layout-router.component.html',
    styleUrls: ['./settings-layout-router.component.scss'],
})
export class SettingsLayoutRouterComponent implements OnInit {
    @ViewChild('sideContent', { static: true }) sideContent!: ElementRef<HTMLElement>;
    @ViewChild('sideContentContainer', { static: true }) sideContentContainer!: ElementRef<HTMLElement>;
    @Input() set expanded(value: boolean | null) {
        if (value) this.#setWidth(this.sideContentWidth);
        else this.renderer.setStyle(this.sideContentContainer.nativeElement, 'width', 0);
        this.isExpanded = value ?? false;
    }
    @Input() sideContentWidth: string = '600px';
    isExpanded = false;
    constructor(private renderer: Renderer2) {}
    ngOnInit(): void {
        if (this.isExpanded) this.#setWidth(this.sideContentWidth);
    }

    #setWidth = (width: string) => {
        this.renderer.setStyle(this.sideContentContainer.nativeElement, 'width', width);
        this.renderer.setStyle(this.sideContent.nativeElement, 'width', width);
    };
}
