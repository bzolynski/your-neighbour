import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerToggleButtonsComponent } from './list-container-toggle-buttons.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [ListContainerToggleButtonsComponent],
    exports: [ListContainerToggleButtonsComponent],
})
export class ListContainerToggleButtonsModule {}
