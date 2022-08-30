import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authenticationInterceptionProvider } from './shared/authentication/util';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdvertisementShellModule } from './advertisements/feature/advertisement-shell/advertisement-shell.module';
import { InfoBarModule } from './shared/ui/info-bar/info-bar.module';
import { notificationReducer } from './data-access/notification/notification.reducer';
import { NotificationEffects } from './data-access/notification/notification.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderModule } from './modules/core/header/header.module';
@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreModule.forRoot({ notification: notificationReducer }),
        EffectsModule.forRoot([NotificationEffects]),
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        RouterModule,
        SharedModule,
        AdvertisementShellModule,
        InfoBarModule,
        FlexLayoutModule,
        HeaderModule,
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    providers: [authenticationInterceptionProvider],
})
export class AppModule {}
