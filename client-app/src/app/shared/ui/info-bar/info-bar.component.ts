import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

export type InfoBarMessageType = 'info' | 'error' | 'warning' | 'success';

export interface MessageWithType {
    message: string;
    type: InfoBarMessageType;
}

@Component({
    selector: 'app-info-bar',
    templateUrl: './info-bar.component.html',
    styleUrls: ['./info-bar.component.scss'],
})
export class InfoBarComponent {
    @Input() messages: MessageWithType[] | null = [];
    @Output() handleClose = new Subject<MessageWithType>();
}
