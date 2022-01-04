import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { HomeModule } from './modules/home/home.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
		HomeModule,
		RouterModule,
		SharedModule,
		SettingsModule
	],
	bootstrap: [ AppComponent ],
	exports: [ AppComponent ]
})
export class AppModule {}
