import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SelectInputComponent,
    SelectInputItemTemplateDirective,
    SelectInputSelectedTemplateDirective,
} from './select-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule],
    declarations: [SelectInputComponent, SelectInputSelectedTemplateDirective, SelectInputItemTemplateDirective],
    exports: [SelectInputComponent, SelectInputSelectedTemplateDirective, SelectInputItemTemplateDirective],
})
export class SelectInputModule {}
