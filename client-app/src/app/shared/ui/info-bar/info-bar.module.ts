import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBarComponent } from './info-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule],
    declarations: [InfoBarComponent],
    exports: [InfoBarComponent],
})
export class InfoBarModule {}
