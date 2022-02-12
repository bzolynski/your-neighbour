import { Component, Inject, OnInit } from '@angular/core';
import {
    MatSnackBarRef,
    MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

export type SnackBarMessageType = 'error' | 'warning' | 'success';

export interface ISnackBarContentData {
    message: string;
    messageType: SnackBarMessageType;
}
@Component({
    selector: 'app-snack-bar-content',
    templateUrl: './snack-bar-content.component.html',
    styleUrls: ['./snack-bar-content.component.scss'],
})
export class SnackBarContentComponent implements OnInit {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarContentData,
        private snackRef: MatSnackBarRef<SnackBarContentComponent>
    ) {}

    ngOnInit(): void {}

    close = () => {
        this.snackRef.dismiss();
    };
}
