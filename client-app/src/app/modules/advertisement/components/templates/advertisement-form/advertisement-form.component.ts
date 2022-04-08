import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { ILocalization } from 'src/app/modules/core/models/localization.model';
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
    localizations$!: Observable<ILocalization[]>;
    localization$: Observable<ILocalization> = new Observable();
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

    constructor(private localizationService: LocalizationService, private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
        this.localizations$ = this.localizationService
            .getManyByUser(this.authenticationService.currentUser!.id)
            .pipe(map((resp) => resp.responseObject));
        this.localization$.subscribe((x) => {
            console.log(x);
        });
    }

    changeLocalization = (localization: ILocalization) => {
        console.log(localization);
    };

    onSubmit = () => {};
}
