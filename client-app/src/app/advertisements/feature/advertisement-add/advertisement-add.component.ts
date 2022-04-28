import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IItem, IItemListing, ILocalization } from 'src/app/shared/data-access/models';
import { MarkerFeature } from 'src/app/shared/data-access/models/api/map-response.model';
import { GenericFormControl } from 'src/app/shared/utils';
import { AdvertisementAddStore } from '../../data-access';

@Component({
    selector: 'app-advertisement-add',
    templateUrl: './advertisement-add.component.html',
    styleUrls: ['./advertisement-add.component.scss'],
    providers: [AdvertisementAddStore],
})
export class AdvertisementAddComponent implements OnInit {
    itemSelectPanelOpen: boolean = false;
    form: FormGroup = new FormGroup({
        itemId: new GenericFormControl<number>(undefined, [Validators.required]),
        localization: new GenericFormControl<ILocalization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
    });
    // observables
    itemsListing$!: Observable<IItemListing[]>;
    markeredLocalization$ = new Subject<ILocalization | null>();
    submitedLocalization$ = new Subject<ILocalization>();

    selectedItem$ = new BehaviorSubject<IItem | undefined>(undefined);
    itemLoading$ = new BehaviorSubject<boolean>(false);
    selectedLocalization$ = new BehaviorSubject<ILocalization | undefined>(undefined);

    constructor(
        private itemService: ItemService,
        private authenticationStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router,
        private advertisementAddStore: AdvertisementAddStore
    ) {}

    ngOnInit(): void {
        this.authenticationStore.user$.subscribe((resp) => {
            if (resp == null) {
                this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
                this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                throwError(new Error('User is not logged in'));
            } else {
                this.itemsListing$ = this.itemService.getByUser(resp.id).pipe(map((resp) => resp.responseObject));
            }
        });
        this.advertisementAddStore.itemIdChanged(
            this.form.get('itemId')!.valueChanges.pipe(
                tap(() => {
                    this.itemLoading$.next(true);
                    this.selectedItem$.next(undefined);
                }),
                map((itemId) => +itemId),
                mergeMap((itemId) =>
                    this.itemService.get(itemId, { includeCategory: true, includeImages: true, maxImages: 1 }).pipe(
                        map((response) => response.responseObject),
                        tap(
                            (item) => {
                                this.itemLoading$.next(false);
                                this.selectedItem$.next(item);
                            },
                            (error) => this.itemLoading$.next(false)
                        )
                    )
                )
            )
        );
        this.advertisementAddStore.localizationChanged(
            this.form.get('localization')!.valueChanges.pipe(
                map((localization) => <ILocalization>localization),
                tap((localization) => this.selectedLocalization$.next(localization))
            )
        );
    }

    handleMarkerMoved = (marker: MarkerFeature) => {
        const localization: ILocalization = {
            name: marker.place_name,
            coordinates: {
                longitude: marker.center[0],
                latitude: marker.center[1],
            },
        };
        this.form.get('localization')?.patchValue(localization);
        this.markeredLocalization$.next(localization);
    };

    handleLocalizationSubmited = (localization: ILocalization) => {
        this.submitedLocalization$.next(localization);
        this.markeredLocalization$.next(undefined);
    };

    onSubmit = () => {
        console.log();
    };
}
