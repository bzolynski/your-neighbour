import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import './extensions';
import { SnackBarModule } from 'src/app/shared/ui/snack-bar/snack-bar.module';

@NgModule({
    imports: [CommonModule, RouterModule, HttpClientModule, AngularMaterialModule, SharedModule, SnackBarModule],
    declarations: [HeaderComponent, FooterComponent],
    exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
