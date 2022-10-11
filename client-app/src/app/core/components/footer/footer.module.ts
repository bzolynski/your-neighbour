import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    imports: [CommonModule, ToolbarModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
})
export class FooterModule {}
