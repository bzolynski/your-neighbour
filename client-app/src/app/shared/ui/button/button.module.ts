import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonModule as PButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToStringModule } from '@shared/pipes/to-string/to-string.module';
@NgModule({
    imports: [CommonModule, PButtonModule, RippleModule, ToStringModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {}
