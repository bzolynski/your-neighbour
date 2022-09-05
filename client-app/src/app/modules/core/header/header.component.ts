import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, signOut } from '@stores/authentication';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    menuItems$: Observable<MenuItem[]> = this.store.select(selectUser).pipe(
        map((user) => [
            { label: 'Ogłoszenia', icon: 'pi pi-server', routerLink: ['/advertisements'] },
            {
                label: 'Czaty',
                icon: 'pi pi-comments',
                visible: user !== null,
                badge: '1',
                tooltip: 'Masz 1 nieprzeczytaną wiadomość!',
                tooltipPosition: 'right',
                routerLink: ['/messages'],
            },
            {
                label: 'Ustawienia',
                icon: 'pi  pi-cog',
                visible: user !== null,
                items: [
                    {
                        label: 'Moje',
                        icon: 'pi pi-user',
                        routerLink: ['/settings', 'my'],
                        items: [
                            { label: 'Konto', icon: 'pi pi-user-edit', routerLink: ['/settings', 'my', 'account'] },
                            { label: 'Ogłoszenia', icon: 'pi pi-server', routerLink: ['/settings', 'my', 'advertisements'] },
                        ],
                    },
                    { separator: true },
                    { label: 'Wszystkie', icon: 'pi pi-list', routerLink: ['/settings'] },
                ],
            },
            {
                label: 'Wyloguj',
                icon: 'pi pi-power-off',
                visible: user !== null,
                command: () => this.store.dispatch(signOut()),
            },
            {
                label: 'Zarejestruj',
                icon: 'pi pi-pencil',
                visible: user === null,
                routerLink: ['/welcome'],
                fragment: 'register',
            },
            { label: 'Zaloguj', icon: 'pi pi-sign-in', visible: user === null, routerLink: ['/welcome'], fragment: 'login' },
        ])
    );
    vm$ = combineLatest([this.menuItems$]).pipe(
        map(([menuItems]) => ({
            menuItems,
        }))
    );
    constructor(private store: Store) {}
}
