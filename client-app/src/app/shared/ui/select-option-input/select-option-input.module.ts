import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOptionInputComponent } from './select-option-input.component';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [CommonModule, MatOptionModule, FormsModule, MatListModule],
    declarations: [SelectOptionInputComponent],
    exports: [SelectOptionInputComponent],
})
export class SelectOptionInputModule {}
