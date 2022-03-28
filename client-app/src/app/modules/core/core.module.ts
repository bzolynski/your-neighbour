import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthentiacionInterceptor } from './authentication/authentication.interceptor';
import { SharedModule } from '../shared/shared.module';
import './extensions';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, RouterModule, HttpClientModule, AngularMaterialModule, SharedModule],
    exports: [HeaderComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthentiacionInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
