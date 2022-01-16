import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HomeComponent, WelcomeComponent } from './pages';
import {
    LandingPageComponent,
    WelcomeLoginFormComponent,
    WelcomeRegisterFormComponent,
} from './components';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        LandingPageComponent,
        WelcomeComponent,
        WelcomeLoginFormComponent,
        WelcomeRegisterFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularMaterialModule,
        HomeRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
