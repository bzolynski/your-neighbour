import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenMessageRoutingModule } from './open-message-routing.module';
import { OpenMessageComponent } from './open-message.component';
import { MessageBubbleModule } from '../../ui/message-bubble/message-bubble.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OpenMessageEffects } from '../../data-access/store/open-message/open-message.effects';
import { openMessageReducer, OPEN_MESSAGE_FEATURE_KEY } from '../../data-access/store/open-message/open-message.reducer';
import { ButtonModule } from '@shared/ui/button/button.module';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        OpenMessageRoutingModule,
        MessageBubbleModule,
        ButtonModule,
        SharedModule,
        StoreModule.forFeature(OPEN_MESSAGE_FEATURE_KEY, openMessageReducer),
        EffectsModule.forFeature([OpenMessageEffects]),
    ],
    declarations: [OpenMessageComponent],
})
export class OpenMessageModule {}
