import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
    declarations: [HomeComponent, LandingPageComponent],
    imports: [CommonModule, SharedModule, AngularMaterialModule],
    exports: [HomeComponent],
})
export class HomeModule {}
