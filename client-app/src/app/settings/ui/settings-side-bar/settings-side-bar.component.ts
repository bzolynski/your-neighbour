import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
    items: MenuItem[] = [
        {
            label: 'Administrator',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/settings', 'category-definitions'],
            items: [
                {
                    label: 'Definicje kategorii',
                    icon: 'pi pi-fw pi-user-plus',
                    routerLink: ['/settings', 'category-definitions'],
                },
                {
                    label: 'Kategorie',
                    icon: 'pi pi-fw pi-user-minus',
                    routerLink: ['/settings', 'categories'],
                },
            ],
        },
        {
            label: 'Moje',
            icon: 'pi pi-user',
            routerLink: ['/settings', 'my'],
            items: [
                { label: 'Konto', icon: 'pi pi-user-edit', routerLink: ['/settings', 'my', 'account'] },
                { label: 'Przedmioty', icon: 'pi pi-shopping-bag', routerLink: ['/settings', 'my', 'items'] },
                { label: 'Ogłoszenia', icon: 'pi pi-server', routerLink: ['/settings', 'my', 'advertisements'] },
            ],
        },
    ];
    constructor(private authStore: AuthenticationStore) {}
}
