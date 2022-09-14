import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementFormComponent } from './advertisement-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { SharedModule } from '@shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        OverlayPanelModule,
        DropdownModule,
        FlexLayoutModule,
        FileUploadModule,
        StepsModule,
        DynamicDialogModule,
        SharedModule,
        DividerModule,
        ConfirmDialogModule,
    ],
    declarations: [AdvertisementFormComponent],
    exports: [AdvertisementFormComponent],
    providers: [ConfirmationService],
})
export class AdvertisementFormModule {}
