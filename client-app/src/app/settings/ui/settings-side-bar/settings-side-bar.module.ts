import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSideBarComponent } from './settings-side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
    declarations: [SettingsSideBarComponent],
    exports: [SettingsSideBarComponent],
})
export class SettingsSideBarModule {}
