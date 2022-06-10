import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeLandingPageComponent } from './welcome-landing-page.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WelcomeLandingPageComponent],
    exports: [WelcomeLandingPageComponent],
})
export class WelcomeLandingPageModule {}
