import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { ILocalization } from 'src/app/modules/core/models/localization.model';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { ItemFormGroup } from '../advertisement-form-item/advertisement-form-item.component';

// TODO: split this into multiple components. move observable logic to advert-creation
// https://stackoverflow.com/questions/43270564/dividing-a-form-into-multiple-components-with-validation
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
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            categoryId: new FormControl(null, [Validators.required]),
            description: new FormControl('', [Validators.required]),
            save: new FormControl(true),
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
