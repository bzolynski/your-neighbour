import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-settings-root',
    templateUrl: './settings-root.component.html',
    styleUrls: ['./settings-root.component.scss'],
})
export class SettingsRootComponent implements OnInit {
    drawerMode: MatDrawerMode = 'side';
    hasBackdrop: boolean = false;
    opened: boolean = true;
    constructor() {}

    ngOnInit(): void {}
}
