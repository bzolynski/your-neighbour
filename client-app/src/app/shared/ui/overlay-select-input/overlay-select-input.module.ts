import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    OverlaySelectInputComponent,
    OverlaySelectInputHeaderTemplateDirective,
    OverlaySelectInputRowTemplateDirective,
    OverlaySelectInputSelectedTemplateDirective,
} from './overlay-select-input.component';
import { ButtonModule } from '../button/button.module';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [CommonModule, OverlayPanelModule, ButtonModule, TableModule, TooltipModule],
    declarations: [
        OverlaySelectInputComponent,
        OverlaySelectInputSelectedTemplateDirective,
        OverlaySelectInputHeaderTemplateDirective,
        OverlaySelectInputRowTemplateDirective,
    ],
    exports: [
        OverlaySelectInputComponent,
        OverlaySelectInputSelectedTemplateDirective,
        OverlaySelectInputHeaderTemplateDirective,
        OverlaySelectInputRowTemplateDirective,
    ],
})
export class OverlaySelectInputModule {}
