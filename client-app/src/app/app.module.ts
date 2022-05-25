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
import { authenticationInterceptionProvider } from './shared/authentication/util';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdvertisementShellModule } from './advertisements/feature/advertisement-shell/advertisement-shell.module';
import { InfoBarModule } from './shared/ui/info-bar/info-bar.module';
import { infoBarReducer } from './data-access/info-bar/info-bar.reducer';
import { InfoBarEffects } from './data-access/info-bar/info-bar.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({ infoBar: infoBarReducer }),
        EffectsModule.forRoot([InfoBarEffects]),
        AppRoutingModule,
        BrowserModule,
        CoreModule,
        HomeModule,
        RouterModule,
        SharedModule,
        SettingsModule,
        BrowserAnimationsModule,
        AdvertisementShellModule,
        InfoBarModule,
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    providers: [authenticationInterceptionProvider],
})
export class AppModule {}
