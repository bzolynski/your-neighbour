import { Component } from '@angular/core';
import { User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-settings-side-bar',
    templateUrl: './settings-side-bar.component.html',
    styleUrls: ['./settings-side-bar.component.scss'],
})
export class SettingsSideBarComponent {
    user$: Observable<User | null> = this.store.select(selectUser);

    #isAdmin$ = this.user$.pipe(map((user) => user !== null && user.roles.some((val) => val === 'Administrator')));

    vm$ = combineLatest([this.#isAdmin$]).pipe(map(([isAdmin]) => ({ isAdmin })));
    items: MenuItem[] = [
        {
            label: 'Administrator',
            icon: 'pi pi-fw pi-user',
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
            items: [
                { label: 'Konto', icon: 'pi pi-user-edit', routerLink: ['/settings', 'account'] },
                { label: 'Ogłoszenia', icon: 'pi pi-server', routerLink: ['/settings', 'advertisements'] },
            ],
        },
    ];
    constructor(private store: Store) {}
}
