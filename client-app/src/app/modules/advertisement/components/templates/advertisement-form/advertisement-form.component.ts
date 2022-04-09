import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { IItem } from 'src/app/modules/core/models/item.model';
import { ILocalization } from 'src/app/modules/core/models/localization.model';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { ItemFormGroup } from '../../organisms/advertisement-form-item/advertisement-form-item.component';

export class Item extends FormGroup {
    value!: {
        name: string;
        categoryId: number;
        description: string;
    };
    constructor(controls: { name: FormControl; categoryId: FormControl; description: FormControl }) {
        super(controls);
    }
}

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit {
    itemClicked: Subject<IItem> = new Subject<IItem>();
    itemSelectPanelOpen: boolean = false;
    form: FormGroup = new FormGroup({
        item: new ItemFormGroup({
            details: new FormGroup({
                name: new FormControl('', [Validators.required, Validators.minLength(3)]),
                categoryId: new FormControl(null, [Validators.required]),
                description: new FormControl('', [Validators.required]),
            }),
            images: new FormControl(new FormData(), [Validators.required]),
        }),
    });

    get itemFormGroup(): ItemFormGroup {
        return this.form.get('item') as ItemFormGroup;
    }

    // observables
    selectedItem$: Observable<IItem> = this.itemClicked.asObservable();
    localizations$!: Observable<ILocalization[]>;
    items$!: Observable<IItem[]>;

    constructor(
        private localizationService: LocalizationService,
        private authenticationService: AuthenticationService,
        private itemService: ItemService
    ) {}

    ngOnInit(): void {
        const userId = this.authenticationService.currentUser?.id;
        if (!userId) throw new Error('User not logged in!');
        this.localizations$ = this.localizationService.getManyByUser(userId).pipe(map((resp) => resp.responseObject));
        this.items$ = this.itemService.getByUser(userId).pipe(map((resp) => resp.responseObject));
    }

    changeLocalization = (localization: ILocalization) => {
        console.log(localization);
    };

    onSubmit = () => {
        console.log();
    };
}
