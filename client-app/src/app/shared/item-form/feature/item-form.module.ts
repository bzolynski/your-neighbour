import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { SelectedImagesModule } from '../ui/selected-images/selected-images.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectedImageModule } from '../ui/selected-image/selected-image.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SelectedImageModule,
        SelectedImagesModule,
        FileInputModule,
        SharedModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
    ],
    declarations: [ItemFormComponent],
    exports: [ItemFormComponent],
})
export class ItemFormModule {}
