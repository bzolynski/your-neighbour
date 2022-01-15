import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TextInputComponent],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule,
    ],
    exports: [TextInputComponent],
})
export class SharedModule {}
