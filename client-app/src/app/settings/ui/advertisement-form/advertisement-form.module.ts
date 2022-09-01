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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

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
        ConfirmDialogModule,

        BackdropLoadingModule,
    ],
    declarations: [AdvertisementFormComponent],
    exports: [AdvertisementFormComponent],
    providers: [ConfirmationService],
})
export class AdvertisementFormModule {}
