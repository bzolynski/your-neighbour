import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryStore } from 'src/app/shared/data-access/store';
import { RoutingHelperMethods } from 'src/app/shared/utils';
import { AdvertisementListStore } from '../../data-access/store/advertisement-list';

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.scss'],
    providers: [AdvertisementListStore, CategoryStore],
})
export class AdvertisementListComponent implements OnInit {
    constructor(private advertisementListStore: AdvertisementListStore, private router: Router, private route: ActivatedRoute) {}
    sortOrder: number = 1;
    sortField: string = '';
    sortOptions: SelectItem[] = [
        { label: 'Miejscowość rosnąco', value: 'localization.city' },
        { label: 'Miejscowość malejąco', value: '!localization.city' },
    ];
    advertisements$ = this.advertisementListStore.advertisements$;
    isLoading$ = this.advertisementListStore.isLoading$;
    activeCategory$ = this.advertisementListStore.activeCategory$;
    menuOptions$: Observable<MenuItem[] | undefined> = this.activeCategory$.pipe(
        map((category) => {
            const childItems: MenuItem[] | undefined = category?.children?.map(
                (child) => ({ label: child.name, routerLink: ['/advertisements', child.id] } as MenuItem)
            );
            const menuItem: MenuItem = {
                label: category?.name,
                items: [
                    {
                        label: `powrót do ${category?.parent?.name}`,
                        routerLink: ['/advertisements', category?.parent?.id],
                        visible: category?.parent ? true : false,
                        icon: 'pi pi-arrow-left',
                    },
                    {
                        separator: true,
                        visible: category?.parent && childItems && childItems.length > 0 ? true : false,
                    },
                    ...(childItems ?? []),
                ],
            };
            return [menuItem];
        })
    );
    ngOnInit(): void {
        this.advertisementListStore.loadCategoryAndAdvertisements(RoutingHelperMethods.combineParams(this.route));
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
