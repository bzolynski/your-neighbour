import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputComponent } from './select-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SelectOptionInputModule } from '../select-option-input/select-option-input.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        SelectOptionInputModule,
        MatListModule,
    ],
    declarations: [SelectInputComponent],
    exports: [SelectInputComponent],
})
export class SelectInputModule {}
