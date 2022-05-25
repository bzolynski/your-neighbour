import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

export type InfoBarMessageType = 'info' | 'error' | 'warning' | 'success';

@Component({
    selector: 'app-info-bar',
    templateUrl: './info-bar.component.html',
    styleUrls: ['./info-bar.component.scss'],
})
export class InfoBarComponent {
    @Input() message: string | null = null;
    @Input() type: InfoBarMessageType | null = null;
    @Output() handleClose = new Subject();
}
