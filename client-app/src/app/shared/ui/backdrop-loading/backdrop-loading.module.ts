import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropLoadingComponent } from './backdrop-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackdropModule } from '../backdrop/backdrop.module';

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule, BackdropModule],
    declarations: [BackdropLoadingComponent],
    exports: [BackdropLoadingComponent],
})
export class BackdropLoadingModule {}
