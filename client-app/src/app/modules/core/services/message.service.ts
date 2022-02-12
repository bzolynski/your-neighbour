import { Injectable } from '@angular/core';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
} from '@angular/material/snack-bar';
import {
    ISnackBarContentData,
    SnackBarContentComponent,
    SnackBarMessageType,
} from '../../shared/components/snack-bar-content/snack-bar-content.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private durationInSeconds: number = 4;
    constructor(private snackBar: MatSnackBar) {}

    showMessage = (message: string, messageType: SnackBarMessageType) => {
        const data: ISnackBarContentData = {
            message: message,
            messageType: messageType,
        };

        this.snackBar.openFromComponent(SnackBarContentComponent, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: data,
            duration: this.durationInSeconds * 1000,
            panelClass: [],
        });
    };
}
