import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesSideBarComponent } from './messages-side-bar.component';
import { ChatCardModule } from '../chat-card/chat-card.module';

@NgModule({
    imports: [CommonModule, ChatCardModule],
    declarations: [MessagesSideBarComponent],
    exports: [MessagesSideBarComponent],
})
export class MessagesSideBarModule {}
