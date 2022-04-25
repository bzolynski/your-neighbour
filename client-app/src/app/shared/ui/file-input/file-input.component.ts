import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
    @Output() fileChanged = new Subject<File[]>();

    @Input() disabled: boolean = false;
    @Input() multiple: boolean = false;
    @Input() areaClickable: boolean = false;
    @Input() accept: string = '';

    onChange = (value: FileList | null) => {
        this.fileChanged.next([...(value ?? [])]);
    };
}
