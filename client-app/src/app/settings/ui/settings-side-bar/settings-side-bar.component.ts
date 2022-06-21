import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';

@Component({
    selector: 'app-settings-side-bar',
    templateUrl: './settings-side-bar.component.html',
    styleUrls: ['./settings-side-bar.component.scss'],
})
export class SettingsSideBarComponent {
    #isAdmin$ = this.authStore.user$.pipe(map((user) => user !== null && user.roles.some((val) => val === 'Administrator')));

    vm$ = combineLatest([this.#isAdmin$]).pipe(map(([isAdmin]) => ({ isAdmin })));
    constructor(private authStore: AuthenticationStore) {}
}
