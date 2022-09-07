import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Base64ToDataUriPipe } from './base64-to-data-uri.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [Base64ToDataUriPipe],
    exports: [Base64ToDataUriPipe],
})
export class Base64ToDataUriModule {}
