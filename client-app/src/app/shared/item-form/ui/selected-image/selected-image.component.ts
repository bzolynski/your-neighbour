import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IImage } from 'src/app/shared/data-access/models';

@Component({
    selector: 'app-selected-image',
    templateUrl: './selected-image.component.html',
    styleUrls: ['./selected-image.component.scss'],
})
export class SelectedImageComponent implements OnInit {
    @Output() deleteButtonClick = new Subject<IImage>();
    @Input() image!: IImage;

    ngOnInit(): void {
        if (!this.image) throw new Error('Provide image! [image]');
    }
}
