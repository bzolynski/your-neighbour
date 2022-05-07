import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementSearchComponent } from './advertisement-search.component';
import { TextInputModule } from '../text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        TextInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
    ],
    declarations: [AdvertisementSearchComponent],
    exports: [AdvertisementSearchComponent],
})
export class AdvertisementSearchModule {}
