import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenMessageRoutingModule } from './open-message-routing.module';
import { OpenMessageComponent } from './open-message.component';
import { MessageBubbleModule } from '../../ui/message-bubble/message-bubble.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { openMessageReducer, OPEN_MESSAGE_FEATURE_KEY } from '../../data-access/store/open-message/open-message.reducer';
import { OpenMessageEffects } from '../../data-access/store/open-message/open-message.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
@NgModule({
    imports: [
        CommonModule,
        OpenMessageRoutingModule,
        MessageBubbleModule,
        MatIconModule,
        MatButtonModule,
        ElevatedSectionModule,
        StoreModule.forFeature(OPEN_MESSAGE_FEATURE_KEY, openMessageReducer),
        EffectsModule.forFeature([OpenMessageEffects]),
    ],
    declarations: [OpenMessageComponent],
})
export class OpenMessageModule {}
