import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskInputComponent } from './mask-input.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
    imports: [CommonModule, InputMaskModule, ReactiveFormsModule, TooltipModule],
    declarations: [MaskInputComponent],
    exports: [MaskInputComponent],
})
export class MaskInputModule {}
