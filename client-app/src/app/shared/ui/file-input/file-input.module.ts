import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
    declarations: [FileInputComponent],
    exports: [FileInputComponent],
})
export class FileInputModule {}
