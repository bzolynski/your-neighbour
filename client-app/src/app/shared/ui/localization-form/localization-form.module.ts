import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationFormComponent } from './localization-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule],
    declarations: [LocalizationFormComponent],
    exports: [LocalizationFormComponent],
})
export class LocalizationFormModule {}
