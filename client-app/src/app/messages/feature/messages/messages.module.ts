import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessagesSideBarModule } from '../../ui/messages-side-bar/messages-side-bar.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { messagesReducer, MESSAGES_FEATURE_KEY } from '../../data-access/store/messages/messages.reducer';
import { MessagesEffects } from '../../data-access/store/messages/messages.effects';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        MessagesRoutingModule,
        MessagesSideBarModule,
        SharedModule,
        StoreModule.forFeature(MESSAGES_FEATURE_KEY, messagesReducer),
        EffectsModule.forFeature([MessagesEffects]),
    ],
    declarations: [MessagesComponent],
})
export class MessagesModule {}
