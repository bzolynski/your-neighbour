import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocalizationsSelectComponent } from './user-localizations-select.component';
import { LocalizationSelectModule } from '../../ui/localization-select/localization-select.module';

@NgModule({
    imports: [CommonModule, LocalizationSelectModule],
    declarations: [UserLocalizationsSelectComponent],
    exports: [UserLocalizationsSelectComponent],
})
export class UserLocalizationsSelectModule {}
