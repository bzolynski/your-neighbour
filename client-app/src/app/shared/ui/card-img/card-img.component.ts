import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-img',
    templateUrl: './card-img.component.html',
    styleUrls: ['./card-img.component.scss'],
})
export class CardImgComponent {
    @Input() src?: string = '';
}
