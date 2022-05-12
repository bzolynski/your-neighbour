import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        if (this.cardImg?.nativeElement?.children.length < 1) this.renderer.addClass(this.cardImg.nativeElement, 'hide');
    }
    @Input() horizontal: boolean = true;
    @ViewChild('XD') cardImg!: ElementRef<HTMLElement>;

    constructor(private renderer: Renderer2) {}
}
