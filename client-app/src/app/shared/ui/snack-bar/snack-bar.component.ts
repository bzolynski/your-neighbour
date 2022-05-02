import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export type SnackBarMessageType = 'info' | 'error' | 'warning' | 'success';

export interface ISnackBarContentData {
    message: string;
    messageType: SnackBarMessageType;
}
@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarContentData,
        private snackRef: MatSnackBarRef<SnackBarComponent>
    ) {}
    close = () => {
        this.snackRef.dismiss();
    };
}
