import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionSelectItemComponent } from './accordion-select-item.component';
import { StopPropagationModule } from '../../directives/stop-propagation/stop-propagation.module';

@NgModule({
    imports: [CommonModule, StopPropagationModule],
    declarations: [AccordionSelectItemComponent],
    exports: [AccordionSelectItemComponent],
})
export class AccordionSelectItemModule {}
