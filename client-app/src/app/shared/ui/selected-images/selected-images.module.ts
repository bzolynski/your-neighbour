import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SelectedImagesComponent } from './selected-images.component';
import { SelectedImageModule } from '../selected-image/selected-image.module';

@NgModule({
    imports: [CommonModule, SharedModule, SelectedImageModule],
    declarations: [SelectedImagesComponent],
    exports: [SelectedImagesComponent],
})
export class SelectedImagesModule {}
