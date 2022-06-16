import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCardComponent } from './chat-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ChatCardComponent],
    exports: [ChatCardComponent],
})
export class ChatCardModule {}
