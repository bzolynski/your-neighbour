import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeLandingPageModule } from '../../ui/welcome-landing-page/welcome-landing-page.module';
import { WelcomeLoginModule } from '../../ui/welcome-login/welcome-login.module';
import { WelcomeRegisterModule } from '../../ui/welcome-register/welcome-register.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
@NgModule({
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        WelcomeLandingPageModule,
        WelcomeLoginModule,
        WelcomeRegisterModule,
        MatTabsModule,
        BackdropLoadingModule,
        MatCardModule,
    ],
    declarations: [WelcomeComponent],
})
export class WelcomeModule {}
