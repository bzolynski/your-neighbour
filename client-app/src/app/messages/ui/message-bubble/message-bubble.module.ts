import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBubbleComponent } from './message-bubble.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MessageBubbleComponent],
    exports: [MessageBubbleComponent],
})
export class MessageBubbleModule {}
