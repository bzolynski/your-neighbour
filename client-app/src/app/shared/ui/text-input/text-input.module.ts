import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
    declarations: [TextInputComponent],
    exports: [TextInputComponent],
})
export class TextInputModule {}
