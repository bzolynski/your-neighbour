import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    drawerMode: MatDrawerMode = 'side';
    hasBackdrop: boolean = false;
    opened: boolean = true;
}
