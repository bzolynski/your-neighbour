import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ISnackBarContentData, SnackBarComponent, SnackBarMessageType } from 'src/app/shared/ui/snack-bar/snack-bar.component';
import {
    ConfirmationDialogComponent,
    ConfirmationDialogData,
    ConfirmationDialogResult,
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private durationInSeconds: number = 4;
    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

    showMessage = (message: string | null, messageType: SnackBarMessageType = 'info') => {
        const data: ISnackBarContentData = {
            message: message ?? 'Unexpected error',
            messageType: messageType,
        };

        this.snackBar.openFromComponent(SnackBarComponent, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: data,
            duration: this.durationInSeconds * 1000,
            panelClass: [],
        });
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
