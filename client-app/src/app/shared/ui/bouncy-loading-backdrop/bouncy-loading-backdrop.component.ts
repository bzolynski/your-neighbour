import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-bouncy-loading-backdrop',
    templateUrl: './bouncy-loading-backdrop.component.html',
    styleUrls: ['./bouncy-loading-backdrop.component.scss'],
})
export class BouncyLoadingBackdropComponent {
    @Input() loadingText?: string;
}
