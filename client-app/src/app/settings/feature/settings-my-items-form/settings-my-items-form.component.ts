import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GenericStoreStatus, ICategory, IItem } from 'src/app/shared/data-access/models';
import { selectStatus } from '../../data-access/store/settings-my-items';
import {
    closeForm,
    createItem,
    loadCategories,
    loadItem,
    resetState,
    selectCategories,
    selectItem,
    selectOpen,
    updateItem,
} from '../../data-access/store/settings-my-items-form';

@Component({
    selector: 'app-settings-my-items-form',
    templateUrl: './settings-my-items-form.component.html',
    styleUrls: ['./settings-my-items-form.component.scss'],
})
export class SettingsMyItemsFormComponent implements OnInit, OnDestroy {
    @ViewChild('modal', { read: TemplateRef, static: true }) modalTemplate!: TemplateRef<any>;

    item$: Observable<IItem | null> = this.store.select(selectItem);
    open$: Observable<boolean | null> = this.store.select(selectOpen).pipe(
        filter((open) => open === false),
        switchMap(() => this.route.queryParams),
        map((params) => {
            console.log(params);
            if (params['returnUrl']) this.router.navigateByUrl(params['returnUrl']);
            else this.router.navigate(['/settings', 'my', 'items']);
            return false;
        })
    );
    status$: Observable<GenericStoreStatus> = this.store.select(selectStatus);
    categories$: Observable<ICategory[] | null> = this.store.select(selectCategories);
    editMode$ = this.route.params.pipe(
        map((params) => {
            if (params['id']) this.store.dispatch(loadItem({ id: +params['id'] }));
            return params['id'] ? true : false;
        })
    );
    destroy$ = new Subject<boolean>();
    constructor(private router: Router, private route: ActivatedRoute, private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadCategories());
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.store.dispatch(resetState());
    }

    formSubmited = (form: FormGroup, id?: number) => {
        if (form.valid) {
            if (id) this.store.dispatch(updateItem({ id: id, item: { ...form.value } as IItem }));
            else this.store.dispatch(createItem({ item: { ...form.value } as IItem }));
        }
    };

    closeForm = () => this.store.dispatch(closeForm());
}
