import { Component, Input } from '@angular/core';
import { Chat } from '../../data-access/models/chat.model';

@Component({
    selector: 'app-chat-card',
    templateUrl: './chat-card.component.html',
    styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent {
    @Input() chat?: Chat;
}
