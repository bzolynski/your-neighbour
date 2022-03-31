import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarContentComponent } from './components/snack-bar-content/snack-bar-content.component';
import { ContainerComponent } from './components/layout/container/container.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { BackdropLoadingComponent } from './components/backdrop-loading/backdrop-loading.component';
import { ElevatedSectionDirective } from './directives';
import { TextAreaInputComponent, TextInputComponent } from './components';

@NgModule({
    declarations: [
        TextInputComponent,
        TextAreaInputComponent,
        SnackBarContentComponent,
        ContainerComponent,
        ConfirmationDialogComponent,
        BackdropLoadingComponent,
        ElevatedSectionDirective,
    ],
    imports: [CommonModule, RouterModule, AngularMaterialModule, ReactiveFormsModule],
    exports: [
        TextInputComponent,
        TextAreaInputComponent,
        ContainerComponent,
        SnackBarContentComponent,
        ConfirmationDialogComponent,
        BackdropLoadingComponent,
        ElevatedSectionDirective,
    ],
})
export class SharedModule {}
