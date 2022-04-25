import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SelectedImageComponent } from './selected-image.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, SharedModule, MatIconModule, MatButtonModule],
    declarations: [SelectedImageComponent],
    exports: [SelectedImageComponent],
})
export class SelectedImageModule {}
