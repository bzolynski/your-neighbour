import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionSelectComponent } from './accordion-select.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CdkAccordionModule, MatExpansionModule, FormsModule, ReactiveFormsModule],
    declarations: [AccordionSelectComponent],
    exports: [AccordionSelectComponent],
})
export class AccordionSelectModule {}
