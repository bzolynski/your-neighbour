import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HomeComponent, WelcomeComponent } from './pages';
import {
    HomeLandingPageComponent,
    WelcomeLandingPageComponent,
    WelcomeLoginFormComponent,
    WelcomeRegisterFormComponent,
} from './components';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeLandingPageComponent,
        WelcomeComponent,
        WelcomeLoginFormComponent,
        WelcomeRegisterFormComponent,
        HomeLandingPageComponent,
    ],
    imports: [CommonModule, SharedModule, AngularMaterialModule, HomeRoutingModule, ReactiveFormsModule, TextInputModule],
    exports: [HomeComponent],
})
export class HomeModule {}
