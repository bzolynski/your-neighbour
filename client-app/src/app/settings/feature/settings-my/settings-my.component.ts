import { Component } from '@angular/core';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-settings-my',
    templateUrl: './settings-my.component.html',
    styleUrls: ['./settings-my.component.scss'],
})
export class SettingsMyComponent {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(private store: Store) {}
}
