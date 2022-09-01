import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, MessageModule],
    declarations: [TextInputComponent],
    exports: [TextInputComponent],
})
export class TextInputModule {}
