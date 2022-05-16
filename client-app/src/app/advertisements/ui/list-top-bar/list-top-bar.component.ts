import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { CategoryStore } from 'src/app/shared/data-access/store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';
import { AdvertisementListStore } from '../../data-access';

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
    categories$ = this.categoryStore.categories$;
    user$ = this.authStore.user$;
    constructor(
        private advertisementListStore: AdvertisementListStore,
        private router: Router,
        private authStore: AuthenticationStore,
        private categoryStore: CategoryStore
    ) {}

    ngOnInit(): void {
        this.categoryStore.loadCategories();
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
