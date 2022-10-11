import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementShellModule } from './advertisements/feature/advertisement-shell/advertisement-shell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoreModule } from '@core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeaderModule } from '@core/components/header/header.module';
import { FooterModule } from '@core/components/footer/footer.module';
@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AdvertisementShellModule,
        FlexLayoutModule,
        HeaderModule,
        FooterModule,
        RippleModule,
        ToastModule,
        ConfirmDialogModule,
        CoreModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    providers: [MessageService, ConfirmationService],
})
export class AppModule {}
