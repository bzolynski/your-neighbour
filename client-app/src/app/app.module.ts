import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { HomeModule } from './modules/home/home.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        AppRoutingModule,
        BrowserModule,
        CoreModule,
        HomeModule,
        RouterModule,
        SharedModule,
        SettingsModule,
        AdvertisementModule,
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
})
export class AppModule {}
