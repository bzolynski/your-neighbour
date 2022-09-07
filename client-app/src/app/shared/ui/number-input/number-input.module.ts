import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from './number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, InputNumberModule, TooltipModule],
    declarations: [NumberInputComponent],
    exports: [NumberInputComponent],
})
export class NumberInputModule {}
