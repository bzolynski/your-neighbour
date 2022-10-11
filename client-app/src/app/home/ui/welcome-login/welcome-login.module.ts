import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeLoginComponent } from './welcome-login.component';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputModule } from '@shared/ui/password-input/password-input.module';
import { ButtonModule } from '@shared/ui/button/button.module';

@NgModule({
    imports: [
        CommonModule,
        TextInputModule,
        BackdropLoadingModule,
        RouterModule,
        ReactiveFormsModule,
        ButtonModule,
        PasswordInputModule,
    ],
    declarations: [WelcomeLoginComponent],
    exports: [WelcomeLoginComponent],
})
export class WelcomeLoginModule {}
