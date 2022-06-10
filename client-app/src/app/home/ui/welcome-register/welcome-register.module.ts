import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRegisterComponent } from './welcome-register.component';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { RouterModule } from '@angular/router';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, TextInputModule, RouterModule, BackdropLoadingModule, ReactiveFormsModule, MatButtonModule],
    declarations: [WelcomeRegisterComponent],
    exports: [WelcomeRegisterComponent],
})
export class WelcomeRegisterModule {}
