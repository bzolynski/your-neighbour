import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    imports: [CommonModule, MenubarModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
})
export class FooterModule {}
