import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ElevatedSectionModule } from '../../directives/elevated-section/elevated-section.module';

@NgModule({
    imports: [CommonModule, ElevatedSectionModule],
    declarations: [CardComponent],
    exports: [CardComponent],
})
export class CardModule {}
