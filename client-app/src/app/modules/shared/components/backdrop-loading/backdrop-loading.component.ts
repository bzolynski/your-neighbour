import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-backdrop-loading',
    templateUrl: './backdrop-loading.component.html',
    styleUrls: ['./backdrop-loading.component.scss'],
})
export class BackdropLoadingComponent {
    @Input()
    backdropColor: string = 'hsl(0, 0%, 100%)';
}
