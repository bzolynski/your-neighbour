import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectedImageModule } from '../selected-image/selected-image.module';
import { SelectedImagesModule } from '../selected-images/selected-images.module';
import { TextInputModule } from '../text-input/text-input.module';
import { TextAreaInputModule } from '../text-area-input/text-area-input.module';

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
        TextInputModule,
        TextAreaInputModule,
    ],
    declarations: [ItemFormComponent],
    exports: [ItemFormComponent],
})
export class ItemFormModule {}
