import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Localization } from 'src/app/shared/data-access/models';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    selectUser,
    selectError,
    selectLocalizations,
    selectStatus,
    loadUser,
    loadLocalizations,
    updateLocalization,
    createLocalization,
    deleteLocalization,
} from '../../data-access/store/settings-my-account';

@Component({
    selector: 'app-settings-my-account',
    templateUrl: './settings-my-account.component.html',
    styleUrls: ['./settings-my-account.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsMyAccountComponent implements OnInit {
    user$ = this.store.select(selectUser);
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);
    localizations$ = this.store.select(selectLocalizations);

    constructor(
        private store: Store,
        public dialog: MatDialog,
        private destroy$: DestroyObservable,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadUser());
        this.store.dispatch(loadLocalizations());
        this.error$
            .pipe(
                takeUntil(this.destroy$),
                filter((error): error is string => error !== null),
                tap((error) => this.messageService.showMessage(error, 'error'))
            )
            .subscribe();
    }
    itemFormSubmited = (id: number | undefined, form: FormGroup) => {
        const localization: Localization = { ...form.value } as Localization;
        if (id) this.store.dispatch(updateLocalization({ id: id, localization: localization }));
        else this.store.dispatch(createLocalization({ localization: localization }));
        this.dialog.closeAll();
    };
    deleteLocalization = (id: number) => {
        this.store.dispatch(deleteLocalization({ id: id }));
    };
}
