import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRegisterComponent } from './welcome-register.component';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputModule } from '@shared/ui/password-input/password-input.module';
import { ButtonModule } from '@shared/ui/button/button.module';

@NgModule({
    imports: [CommonModule, TextInputModule, RouterModule, ReactiveFormsModule, PasswordInputModule, ButtonModule],
    declarations: [WelcomeRegisterComponent],
    exports: [WelcomeRegisterComponent],
})
export class WelcomeRegisterModule {}
