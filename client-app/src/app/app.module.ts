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
        BrowserAnimationsModule,
        AdvertisementShellModule,
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    providers: [authenticationInterceptionProvider],
})
export class AppModule {}
