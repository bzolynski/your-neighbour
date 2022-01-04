import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LandingDividerComponent } from './components/landing-divider/landing-divider.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ HomeComponent, LandingPageComponent, LandingDividerComponent ],
	imports: [ CommonModule, SharedModule ],
	exports: [ HomeComponent ]
})
export class HomeModule {}
