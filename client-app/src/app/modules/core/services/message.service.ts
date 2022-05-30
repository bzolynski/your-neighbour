import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addInfoBarMessage } from 'src/app/data-access/info-bar/info-bar.actions';
import { RootState } from 'src/app/data-access/root.state';
import { InfoBarMessageType } from 'src/app/shared/ui/info-bar/info-bar.component';
import {
    ConfirmationDialogComponent,
    ConfirmationDialogData,
    ConfirmationDialogResult,
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private dialog: MatDialog, private store: Store<RootState>) {}

    showMessage = (message: string, messageType: InfoBarMessageType) => {
        this.store.dispatch(addInfoBarMessage({ message: message, messageType: messageType }));
    };
    showConfirmationDialog = (question?: string, title?: string): Observable<ConfirmationDialogResult> => {
        const data: ConfirmationDialogData = {
            cancelText: 'Nie',
            confirmText: 'Tak',
            question: question,
            title: title,
        };
        return this.dialog
            .open(ConfirmationDialogComponent, { data: data })
            .afterClosed() as Observable<ConfirmationDialogResult>;
    };
}
