import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevatedSectionDirective } from './elevated-section.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ElevatedSectionDirective],
    exports: [ElevatedSectionDirective],
})
export class ElevatedSectionModule {}
