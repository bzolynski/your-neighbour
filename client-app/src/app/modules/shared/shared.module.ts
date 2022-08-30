import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './components/layout/container/container.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { BackdropLoadingComponent } from './components/backdrop-loading/backdrop-loading.component';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';

@NgModule({
    declarations: [
        ContainerComponent,
        ConfirmationDialogComponent,
        BackdropLoadingComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        TextInputModule,
    ],
    exports: [
        ContainerComponent,
        ConfirmationDialogComponent,
        BackdropLoadingComponent,
    ],
})
export class SharedModule {}
