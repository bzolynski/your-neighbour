import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerDirective } from './card-container.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [CardContainerDirective],
    exports: [CardContainerDirective],
})
export class CardContainerModule {}
