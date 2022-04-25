import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSelectComponent } from './item-select.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [CommonModule, CdkAccordionModule, MatExpansionModule],
    declarations: [ItemSelectComponent],
    exports: [ItemSelectComponent],
})
export class ItemSelectModule {}
