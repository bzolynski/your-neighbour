import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaInputComponent } from './text-area-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    declarations: [TextAreaInputComponent],
    exports: [TextAreaInputComponent],
})
export class TextAreaInputModule {}
