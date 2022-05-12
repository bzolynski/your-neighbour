import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyLocalizationsRoutingModule } from './settings-my-localizations-routing.module';
import { SettingsMyLocalizationsComponent } from './settings-my-localizations.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { ItemSearchModule } from '../../ui/item-search/item-search.module';
import { ListContainerToggleButtonsModule } from 'src/app/shared/ui/list-container-toggle-buttons/list-container-toggle-buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { MatIconModule } from '@angular/material/icon';
import { LocalizationFormModule } from 'src/app/shared/ui/localization-form/localization-form.module';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyLocalizationsRoutingModule,
        ElevatedSectionModule,
        ListContainerModule,
        ItemSearchModule,
        ListContainerToggleButtonsModule,
        MatDialogModule,
        LocalizationFormModule,
        MatButtonModule,
        ListContainerModule,
        CardModule,
        CardContentModule,
        MatIconModule,
        StopPropagationModule,
    ],
    declarations: [SettingsMyLocalizationsComponent],
})
export class SettingsMyLocalizationsModule {}
