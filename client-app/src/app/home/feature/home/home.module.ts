import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { AdvertisementCardModule } from 'src/app/advertisements/ui/advertisement-card/advertisement-card.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer, HOME_FEATURE_KEY } from '../../data-access/store/home/home.reducer';
import { HomeEffects } from '../../data-access/store/home/home.effects';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ElevatedSectionModule,
        ListContainerModule,
        AdvertisementCardModule,
        BouncyLoadingBackdropModule,

        StoreModule.forFeature(HOME_FEATURE_KEY, homeReducer),
        EffectsModule.forFeature([HomeEffects]),
    ],
    declarations: [HomeComponent],
})
export class HomeModule {}
