import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTopBarComponent } from './list-top-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementSearchModule } from 'src/app/shared/ui/advertisement-search/advertisement-search.module';
import { ListContainerToggleButtonsModule } from 'src/app/shared/ui/list-container-toggle-buttons/list-container-toggle-buttons.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        AdvertisementSearchModule,
        ListContainerToggleButtonsModule,
    ],
    declarations: [ListTopBarComponent],
    exports: [ListTopBarComponent],
})
export class ListTopBarModule {}
