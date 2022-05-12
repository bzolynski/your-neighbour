import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';

@Component({
    selector: 'app-item-search',
    templateUrl: './item-search.component.html',
    styleUrls: ['./item-search.component.scss'],
})
export class ItemSearchComponent {
    //@Output() searchSubmited = new Subject<FormGroup>();
    @Output() textChanged = new Subject<string>();
    form = new GenericFormGroup({
        search: new GenericFormControl(''),
    });
}
