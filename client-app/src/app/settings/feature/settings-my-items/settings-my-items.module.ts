import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyItemsRoutingModule } from './settings-my-items-routing.module';
import { SettingsMyItemsComponent } from './settings-my-items.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { ItemSearchModule } from '../../ui/item-search/item-search.module';
import { ItemCardModule } from '../../ui/item-card/item-card.module';
import { ListContainerToggleButtonsModule } from 'src/app/shared/ui/list-container-toggle-buttons/list-container-toggle-buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemFormModule } from 'src/app/shared/ui/item-form/item-form.module';
import { MatButtonModule } from '@angular/material/button';
import { TriggerOnScrollModule } from 'src/app/shared/directives/trigger-on-scroll/trigger-on-scroll.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyItemsRoutingModule,
        ElevatedSectionModule,
        ListContainerModule,
        ItemSearchModule,
        ItemCardModule,
        ListContainerToggleButtonsModule,
        MatDialogModule,
        ItemFormModule,
        MatButtonModule,
        TriggerOnScrollModule,
    ],
    declarations: [SettingsMyItemsComponent],
})
export class SettingsMyItemsModule {}
