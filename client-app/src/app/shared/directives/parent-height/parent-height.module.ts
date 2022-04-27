import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentHeightDirective } from './parent-height.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ParentHeightDirective],
    exports: [ParentHeightDirective],
})
export class ParentHeightModule {}
