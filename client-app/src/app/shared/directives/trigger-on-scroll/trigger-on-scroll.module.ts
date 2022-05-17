import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerOnScrollDirective } from './trigger-on-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TriggerOnScrollDirective],
    exports: [TriggerOnScrollDirective],
})
export class TriggerOnScrollModule {}
