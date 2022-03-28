import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
    title?: string;
    question?: string;
    confirmText?: string;
    cancelText?: string;
}
export interface ConfirmationDialogResult {
    result: boolean;
}
@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
    ) {
        data.question = data.question ?? 'Are you sure?';
        data.cancelText = data.cancelText ?? 'No';
        data.confirmText = data.confirmText ?? 'Yes';
    }
    closeDialog = (result: boolean) => {
        const dialogResult: ConfirmationDialogResult = {
            result: result,
        };
        this.dialogRef.close(dialogResult);
    };
}
