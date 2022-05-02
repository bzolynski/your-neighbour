import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatSnackBarModule, MatIconModule],
    declarations: [SnackBarComponent],
    exports: [SnackBarComponent],
})
export class SnackBarModule {}
