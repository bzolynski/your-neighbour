import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputWithDropdownComponent } from './components/form/text-input-with-dropdown/text-input-with-dropdown.component';
import { RouterModule } from '@angular/router';
import { SpinnerButtonComponent } from './components/buttons/spinner-button/spinner-button.component';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TextInputWithDropdownComponent,
        SpinnerButtonComponent,
        TextInputComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        TextInputWithDropdownComponent,
        SpinnerButtonComponent,
        TextInputComponent,
    ],
})
export class SharedModule {}
