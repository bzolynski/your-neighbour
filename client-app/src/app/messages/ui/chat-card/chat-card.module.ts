import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCardComponent } from './chat-card.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ChatCardComponent],
    exports: [ChatCardComponent],
})
export class ChatCardModule {}
