import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-settings-layout-router',
    templateUrl: './settings-layout-router.component.html',
    styleUrls: ['./settings-layout-router.component.scss'],
})
export class SettingsLayoutRouterComponent {
    @Input() expanded: boolean | null = false;
}
