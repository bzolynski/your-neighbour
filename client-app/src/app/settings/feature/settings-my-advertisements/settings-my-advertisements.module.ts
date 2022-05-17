import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyAdvertisementsRoutingModule } from './settings-my-advertisements-routing.module';
import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { ItemSearchModule } from '../../ui/item-search/item-search.module';
import { ListContainerToggleButtonsModule } from 'src/app/shared/ui/list-container-toggle-buttons/list-container-toggle-buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalizationFormModule } from 'src/app/shared/ui/localization-form/localization-form.module';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
import { AdvertisementCardModule } from 'src/app/advertisements/ui/advertisement-card/advertisement-card.module';
import { TriggerOnScrollModule } from 'src/app/shared/directives/trigger-on-scroll/trigger-on-scroll.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyAdvertisementsRoutingModule,
        ElevatedSectionModule,
        ListContainerModule,
        ItemSearchModule,
        ListContainerToggleButtonsModule,
        MatDialogModule,
        LocalizationFormModule,
        MatButtonModule,
        ListContainerModule,
        MatIconModule,
        StopPropagationModule,
        AdvertisementCardModule,
        TriggerOnScrollModule,
    ],
    declarations: [SettingsMyAdvertisementsComponent],
})
export class SettingsMyAdvertisementsModule {}
