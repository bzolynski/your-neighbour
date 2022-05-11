import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSearchComponent } from './item-search.component';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, TextInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
    declarations: [ItemSearchComponent],
    exports: [ItemSearchComponent],
})
export class ItemSearchModule {}
