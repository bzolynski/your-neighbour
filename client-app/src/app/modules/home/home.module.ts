import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HomeComponent, WelcomeComponent } from './pages';
import { LandingPageComponent, WelcomeLoginFormComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        HomeComponent,
        LandingPageComponent,
        WelcomeComponent,
        WelcomeLoginFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularMaterialModule,
        HomeRoutingModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
