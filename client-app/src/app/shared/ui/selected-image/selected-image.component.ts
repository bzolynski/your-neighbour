import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from '@models/';

@Component({
    selector: 'app-selected-image',
    templateUrl: './selected-image.component.html',
    styleUrls: ['./selected-image.component.scss'],
})
export class SelectedImageComponent implements OnInit {
    @Output() deleteButtonClick = new Subject<Image>();
    @Input() image!: Image;

    ngOnInit(): void {
        if (!this.image) throw new Error('Provide image! [image]');
    }
}
