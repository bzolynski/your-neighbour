import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementListRoutingModule } from './advertisement-list-routing.module';
import { AdvertisementListComponent } from './advertisement-list.component';
import { ListSidePanelModule } from '../../ui/list-side-panel/list-side-panel.module';
import { ListTopBarModule } from '../../ui/list-top-bar/list-top-bar.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdvertisementCardModule } from '../../ui/advertisement-card/advertisement-card.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementListRoutingModule,
        ListSidePanelModule,
        ListTopBarModule,
        SharedModule,
        AdvertisementCardModule,
        ElevatedSectionModule,
        ListContainerModule,
        BouncyLoadingBackdropModule,
    ],
    declarations: [AdvertisementListComponent],
})
export class AdvertisementListModule {}
