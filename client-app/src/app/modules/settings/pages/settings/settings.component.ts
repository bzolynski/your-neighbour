import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    drawerMode: MatDrawerMode = 'side';
    hasBackdrop: boolean = false;
    opened: boolean = true;
    constructor() {}

    ngOnInit(): void {}
}
