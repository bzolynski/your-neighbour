import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-backdrop',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent {
    @Input()
    backdropColor: string = 'hsla(0, 0%, 100%, 0.75)';
}
