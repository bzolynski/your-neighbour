import { Component, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { Category } from '../../data-access/models';
import { GenericFormControl, GenericFormGroup } from '../../utils';

@Component({
    selector: 'app-advertisement-search',
    templateUrl: './advertisement-search.component.html',
    styleUrls: ['./advertisement-search.component.scss'],
})
export class AdvertisementSearchComponent {
    @Output() searchSubmited = new Subject<FormGroup>();
    @Input() categories?: Category[] | null = [];

    @ViewChild('select', { read: MatSelect, static: true }) select!: MatSelect;

    form = new GenericFormGroup({
        search: new GenericFormControl(''),
        categoryId: new GenericFormControl<number>(undefined),
    });
}
