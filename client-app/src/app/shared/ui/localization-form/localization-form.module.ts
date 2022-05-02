import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationFormComponent } from './localization-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from '../text-input/text-input.module';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule, TextInputModule],
    declarations: [LocalizationFormComponent],
    exports: [LocalizationFormComponent],
})
export class LocalizationFormModule {}
