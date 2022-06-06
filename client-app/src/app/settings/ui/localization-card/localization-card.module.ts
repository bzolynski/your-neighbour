import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationCardComponent } from './localization-card.component';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { MatIconModule } from '@angular/material/icon';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';

@NgModule({
    imports: [CommonModule, CardModule, CardContentModule, MatIconModule, StopPropagationModule],
    declarations: [LocalizationCardComponent],
    exports: [LocalizationCardComponent],
})
export class LocalizationCardModule {}
