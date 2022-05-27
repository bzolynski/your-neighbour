import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategories, selectCategories, selectError, selectStatus } from '../../data-access/store/settings-categories';

@Component({
    selector: 'app-settings-categories',
    templateUrl: './settings-categories.component.html',
    styleUrls: ['./settings-categories.component.scss'],
})
export class SettingsCategoriesComponent implements OnInit {
    categories$ = this.store.select(selectCategories);
    status$ = this.store.select(selectStatus);
    error$ = this.store.select(selectError);

    constructor(private store: Store) {}
    ngOnInit(): void {
        this.store.dispatch(loadCategories());
    }

    expanded = false;
    triggerExpanded = () => {
        this.expanded = !this.expanded;
    };
}
