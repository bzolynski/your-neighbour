import { Component } from '@angular/core';

@Component({
    template: `
        <div fxLayout="row" fxLayoutGap="16px">
            <app-settings-side-bar fxFlex="0 1 320px"></app-settings-side-bar>
            <div fxFlex="100">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
})
export class SettingsShellComponent {}
