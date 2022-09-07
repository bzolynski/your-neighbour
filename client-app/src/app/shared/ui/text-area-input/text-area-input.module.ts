import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaInputComponent } from './text-area-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, InputTextareaModule, TooltipModule],
    declarations: [TextAreaInputComponent],
    exports: [TextAreaInputComponent],
})
export class TextAreaInputModule {}
