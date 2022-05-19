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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsMyItemsEffects,
    settingsMyItemsReducer,
    SETTINGS_MY_ITEM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-items';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
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
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ITEM_STATE_FEATURE_KEY, settingsMyItemsReducer),
        EffectsModule.forFeature([SettingsMyItemsEffects]),
    ],
    declarations: [SettingsMyItemsComponent],
})
export class SettingsMyItemsModule {}
