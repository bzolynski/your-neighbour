import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentWidthDirective } from './parent-width.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ParentWidthDirective],
    exports: [ParentWidthDirective],
})
export class ParentWidthModule {}
