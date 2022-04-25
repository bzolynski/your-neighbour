import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IImage, IItemListing, ILocalization } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';

@Component({
    selector: 'app-advertisement-add',
    templateUrl: './advertisement-add.component.html',
    styleUrls: ['./advertisement-add.component.scss'],
})
export class AdvertisementAddComponent implements OnInit {
    itemClicked: Subject<number> = new Subject<number>();
    itemSelectPanelOpen: boolean = false;
    form: FormGroup = new FormGroup({
        item: new FormGroup({
            name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
            categoryId: new GenericFormControl<number>(undefined, [Validators.required]),
            description: new GenericFormControl<string>('', [Validators.required]),
            images: new GenericFormControl<IImage[]>([], [Validators.required]),
        }),
    });
    // observables
    selectedItemId$: Observable<number> = this.itemClicked.asObservable();
    localizations$!: Observable<ILocalization[]>;
    itemsListing$!: Observable<IItemListing[]>;

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

    changeLocalization = (localization: any) => {
        console.log(localization);
    };

    onSubmit = () => {
        console.log();
    };
}
