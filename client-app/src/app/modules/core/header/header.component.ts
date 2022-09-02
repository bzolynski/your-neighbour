import { Component, OnDestroy } from '@angular/core';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { selectUser, signOut } from '@stores/authentication';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    user$: Observable<User | null> = this.store.select(selectUser);
    menuItems: MenuItem[] = [
        { label: 'Ogłoszenia', icon: 'pi pi-server', routerLink: ['/advertisements'] },
        {
            label: 'Czaty',
            badge: '1',
            tooltip: 'Masz 1 nieprzeczytaną wiadomość!',
            tooltipPosition: 'right',
            icon: 'pi pi-comments',
            routerLink: ['/messages'],
        },
        {
            label: 'Ustawienia',
            icon: 'pi  pi-cog',
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
            command: () => this.store.dispatch(signOut()),
        },
        { label: 'Zaloguj', icon: 'pi pi-sign-in', routerLink: ['/welcome'], fragment: 'login' },
        { label: 'Zarejestruj', icon: 'pi pi-pencil', routerLink: ['/welcome'], fragment: 'register' },
    ];

    unsubscriber$: Subject<boolean> = new Subject<boolean>();
    vm$ = combineLatest([this.user$]).pipe(
        map(([user]) => ({
            user,
        }))
    );
    constructor(private store: Store) {}

    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
