import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BouncyLoadingBackdropComponent } from './bouncy-loading-backdrop.component';
import { BackdropModule } from '../backdrop/backdrop.module';

@NgModule({
    imports: [CommonModule, BackdropModule],
    declarations: [BouncyLoadingBackdropComponent],
    exports: [BouncyLoadingBackdropComponent],
})
export class BouncyLoadingBackdropModule {}
