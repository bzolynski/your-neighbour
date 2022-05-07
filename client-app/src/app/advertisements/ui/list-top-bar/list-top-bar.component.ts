import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';
import { AdvertisementListStore, ListViewType } from '../../data-access';

@Component({
    selector: 'app-list-top-bar',
    templateUrl: './list-top-bar.component.html',
    styleUrls: ['./list-top-bar.component.scss'],
})
export class ListTopBarComponent implements OnInit {
    form = new GenericFormGroup({
        search: new GenericFormControl(''),
    });

    selectedListViewType$: Observable<ListViewType> = this.advertisementListStore.listViewType$;
    categories$ = this.advertisementListStore.categories$;
    constructor(private advertisementListStore: AdvertisementListStore, private router: Router) {}

    ngOnInit(): void {
        this.advertisementListStore.loadCategories();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.advertisementListStore.changeListViewType(listViewType);
    };

    submitSearch = (form: FormGroup) => {
        this.router.navigate(['/advertisements', form.value.categoryId ?? ''], {
            queryParams: form.value.search
                ? {
                      search: form.value.search,
                  }
                : undefined,
        });
    };
}
