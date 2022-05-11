import { Component, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';

@Component({
    selector: 'app-item-search',
    templateUrl: './item-search.component.html',
    styleUrls: ['./item-search.component.scss'],
})
export class ItemSearchComponent {
    @Output() searchSubmited = new Subject<FormGroup>();
    form = new GenericFormGroup({
        search: new GenericFormControl(''),
    });
}
