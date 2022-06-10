import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeShellRoutingModule } from './home-shell-routing.module';
import { WelcomeModule } from '../welcome/welcome.module';
import { HomeModule } from '../home/home.module';

@NgModule({
    imports: [CommonModule, HomeShellRoutingModule, WelcomeModule, HomeModule],
    declarations: [],
})
export class HomeShellModule {}
