import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementShellModule } from './advertisements/feature/advertisement-shell/advertisement-shell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderModule } from './modules/core/header/header.module';
import { RippleModule } from 'primeng/ripple';
import { FooterModule } from './modules/core/footer/footer.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoreModule2 } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        RouterModule,
        SharedModule,
        AdvertisementShellModule,
        FlexLayoutModule,
        HeaderModule,
        FooterModule,
        RippleModule,
        ToastModule,
        ConfirmDialogModule,
        CoreModule2,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    providers: [MessageService, ConfirmationService],
})
export class AppModule {}
