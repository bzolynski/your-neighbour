import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyRoutingModule } from './settings-my-routing.module';
import { SettingsMyComponent } from './settings-my.component';
import { RouterModule } from '@angular/router';
import { CardContainerModule } from 'src/app/shared/directives/card-container/card-container.module';
import { RippleModule } from 'primeng/ripple';
@NgModule({
    imports: [CommonModule, SettingsMyRoutingModule, RouterModule, CardContainerModule, RippleModule],
    declarations: [SettingsMyComponent],
})
export class SettingsMyModule {}
