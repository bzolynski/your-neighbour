import { Component, Input } from '@angular/core';
import { Chat } from '../../data-access/models/chat.model';

@Component({
    selector: 'app-messages-side-bar',
    templateUrl: './messages-side-bar.component.html',
    styleUrls: ['./messages-side-bar.component.scss'],
})
export class MessagesSideBarComponent {
    @Input() chats: Chat[] | null = [];
}
