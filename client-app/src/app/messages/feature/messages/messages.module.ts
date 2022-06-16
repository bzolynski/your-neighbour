import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessagesSideBarModule } from '../../ui/messages-side-bar/messages-side-bar.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { messagesReducer, MESSAGES_FEATURE_KEY } from '../../data-access/store/messages/messages.reducer';
import { MessagesEffects } from '../../data-access/store/messages/messages.effects';
@NgModule({
    imports: [
        CommonModule,
        MessagesRoutingModule,
        MessagesSideBarModule,
        ElevatedSectionModule,
        MatButtonModule,
        MatIconModule,
        StoreModule.forFeature(MESSAGES_FEATURE_KEY, messagesReducer),
        EffectsModule.forFeature([MessagesEffects]),
    ],
    declarations: [MessagesComponent],
})
export class MessagesModule {}
