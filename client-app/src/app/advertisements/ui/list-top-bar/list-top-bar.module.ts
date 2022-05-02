import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTopBarComponent } from './list-top-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
    declarations: [ListTopBarComponent],
    exports: [ListTopBarComponent],
})
export class ListTopBarModule {}
