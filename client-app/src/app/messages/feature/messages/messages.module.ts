import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessagesSideBarModule } from '../../ui/messages-side-bar/messages-side-bar.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageBubbleModule } from '../../ui/message-bubble/message-bubble.module';
@NgModule({
    imports: [
        CommonModule,
        MessagesRoutingModule,
        MessagesSideBarModule,
        ElevatedSectionModule,
        MatButtonModule,
        MatIconModule,
        MessageBubbleModule,
    ],
    declarations: [MessagesComponent],
})
export class MessagesModule {}
