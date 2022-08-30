import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import './extensions';

@NgModule({
    imports: [CommonModule, RouterModule, HttpClientModule, AngularMaterialModule, SharedModule],
    declarations: [],
    exports: [],
})
export class CoreModule {}
