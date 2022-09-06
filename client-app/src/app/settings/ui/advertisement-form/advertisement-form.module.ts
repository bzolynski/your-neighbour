import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementFormComponent } from './advertisement-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { SelectInputModule } from 'src/app/shared/ui/select-input/select-input.module';
import { TextAreaInputModule } from 'src/app/shared/ui/text-area-input/text-area-input.module';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        OverlayPanelModule,
        ButtonModule,
        DropdownModule,
        FlexLayoutModule,
        SelectInputModule,
        TextAreaInputModule,
        TextInputModule,
        FileUploadModule,
        StepsModule,
        DynamicDialogModule,
    ],
    declarations: [AdvertisementFormComponent],
    exports: [AdvertisementFormComponent],
    providers: [ConfirmationService],
})
export class AdvertisementFormModule {}
