import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTopBarComponent } from './list-top-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementSearchModule } from 'src/app/shared/ui/advertisement-search/advertisement-search.module';

@NgModule({
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, AdvertisementSearchModule],
    declarations: [ListTopBarComponent],
    exports: [ListTopBarComponent],
})
export class ListTopBarModule {}
