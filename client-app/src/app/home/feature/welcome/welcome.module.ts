import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeLandingPageModule } from '../../ui/welcome-landing-page/welcome-landing-page.module';
import { WelcomeLoginModule } from '../../ui/welcome-login/welcome-login.module';
import { WelcomeRegisterModule } from '../../ui/welcome-register/welcome-register.module';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        WelcomeLandingPageModule,
        WelcomeLoginModule,
        WelcomeRegisterModule,
        TabViewModule,
        SharedModule,
    ],
    declarations: [WelcomeComponent],
})
export class WelcomeModule {}
