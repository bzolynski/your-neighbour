import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementListRoutingModule } from './advertisement-list-routing.module';
import { AdvertisementListComponent } from './advertisement-list.component';
import { ListSidePanelModule } from '../../ui/list-side-panel/list-side-panel.module';
import { ListTopBarModule } from '../../ui/list-top-bar/list-top-bar.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdvertisementCardModule } from '../../ui/advertisement-card/advertisement-card.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementListRoutingModule,
        ListSidePanelModule,
        ListTopBarModule,
        SharedModule,
        AdvertisementCardModule,
        ElevatedSectionModule,
    ],
    declarations: [AdvertisementListComponent],
})
export class AdvertisementListModule {}
