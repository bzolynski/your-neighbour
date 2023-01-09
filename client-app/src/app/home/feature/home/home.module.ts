import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer, HOME_FEATURE_KEY } from '../../data-access/store/home/home.reducer';
import { HomeEffects } from '../../data-access/store/home/home.effects';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        CarouselModule,
        ButtonModule,
        RippleModule,
        StoreModule.forFeature(HOME_FEATURE_KEY, homeReducer),
        EffectsModule.forFeature([HomeEffects]),
        SharedModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule {}
