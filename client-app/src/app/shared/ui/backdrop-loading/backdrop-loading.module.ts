import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropLoadingComponent } from './backdrop-loading.component';
import { BackdropModule } from '../backdrop/backdrop.module';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
    imports: [CommonModule, BackdropModule, ProgressSpinnerModule],
    declarations: [BackdropLoadingComponent],
    exports: [BackdropLoadingComponent],
})
export class BackdropLoadingModule {}
