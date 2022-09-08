import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

type ButtonSize = 'small' | 'normal' | 'large';
type ButtonStyle = 'flat' | 'raised' | 'outlined' | 'filled' | 'raised-filled';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonIcon = typeof PrimeIcons[keyof typeof PrimeIcons];
@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @ViewChild('button', { static: true }) button?: ElementRef<HTMLButtonElement>;
    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() buttonLoading: boolean = false;
    @Input() buttonColor: ButtonColor = 'primary';
    @Input() buttonIcon: ButtonIcon = '';
    @Input() type: ButtonType = 'button';
    @Input() set buttonSize(value: ButtonSize | undefined) {
        switch (value) {
            case 'small':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-sm');
                break;
            case 'normal':
                this.renderer.addClass(this.button?.nativeElement, 'p-button');
                break;
            case 'large':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-lg');
                break;
            default:
                this.renderer.addClass(this.button?.nativeElement, 'p-button');
                break;
        }
    }
    @Input() set buttonRounded(value: boolean | undefined) {
        if (value) this.renderer.addClass(this.button?.nativeElement, 'p-button-rounded');
    }
    @Input() set buttonStyle(value: ButtonStyle | undefined) {
        switch (value) {
            case 'flat':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-text');
                break;
            case 'raised':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-raised');
                this.renderer.addClass(this.button?.nativeElement, 'p-button-text');
                break;
            case 'outlined':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-outlined');
                break;
            case 'raised-filled':
                this.renderer.addClass(this.button?.nativeElement, 'p-button-raised');
                break;
            case 'filled':
                break;
            default:
                this.renderer.addClass(this.button?.nativeElement, 'p-button-text');
                break;
        }
    }

    constructor(private renderer: Renderer2) {}
}
