import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer, HOME_FEATURE_KEY } from '../../data-access/store/home/home.reducer';
import { HomeEffects } from '../../data-access/store/home/home.effects';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ElevatedSectionModule,
        BouncyLoadingBackdropModule,
        CarouselModule,
        ButtonModule,
        RippleModule,
        StopPropagationModule,
        StoreModule.forFeature(HOME_FEATURE_KEY, homeReducer),
        EffectsModule.forFeature([HomeEffects]),
    ],
    declarations: [HomeComponent],
})
export class HomeModule {}
