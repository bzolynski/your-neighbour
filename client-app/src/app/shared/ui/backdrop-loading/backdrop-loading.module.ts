import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropLoadingComponent } from './backdrop-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule],
    declarations: [BackdropLoadingComponent],
    exports: [BackdropLoadingComponent],
})
export class BackdropLoadingModule {}
