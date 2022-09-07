import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
@NgModule({
    imports: [CommonModule, PasswordModule, ReactiveFormsModule, TooltipModule, DividerModule],
    declarations: [PasswordInputComponent],
    exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
