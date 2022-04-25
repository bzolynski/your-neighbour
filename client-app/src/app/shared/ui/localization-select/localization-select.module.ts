import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationSelectComponent } from './localization-select.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [CommonModule, CdkAccordionModule, MatExpansionModule, MatListModule],
    declarations: [LocalizationSelectComponent],
    exports: [LocalizationSelectComponent],
})
export class LocalizationSelectModule {}
