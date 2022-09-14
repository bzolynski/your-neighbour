import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevationDirective } from './elevation.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ElevationDirective],
    exports: [ElevationDirective],
})
export class ElevationModule {}
