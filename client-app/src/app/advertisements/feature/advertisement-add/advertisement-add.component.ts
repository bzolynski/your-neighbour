import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { ICoordinates, IItemListing, ILocalization } from 'src/app/shared/data-access/models';
import { MarkerFeature } from 'src/app/shared/data-access/models/api/map-response.model';
import { GenericFormControl } from 'src/app/shared/utils';

@Component({
    selector: 'app-advertisement-add',
    templateUrl: './advertisement-add.component.html',
    styleUrls: ['./advertisement-add.component.scss'],
})
export class AdvertisementAddComponent implements OnInit {
    itemSelectPanelOpen: boolean = false;
    form: FormGroup = new FormGroup({
        itemId: new GenericFormControl<number>(undefined, [Validators.required]),
        localization: new GenericFormControl<ILocalization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
    });
    // observables
    localizations$!: Observable<ILocalization[]>;
    itemsListing$!: Observable<IItemListing[]>;
    coordinates$ = new Subject<ICoordinates>();
    constructor(
        private localizationService: LocalizationService,
        private itemService: ItemService,
        private authenticationStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authenticationStore.user$.subscribe((resp) => {
            if (resp == null) {
                this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
                this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                throwError(new Error('User is not logged in'));
            } else {
                this.localizations$ = this.localizationService.getManyByUser(resp.id).pipe(map((resp) => resp.responseObject));
                this.itemsListing$ = this.itemService.getListingByUser(resp.id).pipe(map((resp) => resp.responseObject));
            }
        });
    }

    handleMarkerMoved = (marker: MarkerFeature) => {
        const localization: ILocalization = {
            address: marker.place_name,
            coordinates: {
                longitude: marker.center[0],
                latitude: marker.center[1],
            },
        };
        this.form.get('localization')?.patchValue(localization);
    };

    handleItemSelected = (itemId: number) => {
        this.form.get('itemId')?.patchValue(itemId);
    };

    handleLocalizationSelected = (localization: ILocalization) => {
        this.coordinates$.next(localization.coordinates);
    };

    onSubmit = () => {
        console.log();
    };
}
