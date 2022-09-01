import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { AdvertisementDefinitionService } from 'src/app/shared/data-access/api';
import { AdvertisementDefinition, IItem, Localization } from 'src/app/shared/data-access/models';
import { GenericFormControl } from 'src/app/shared/utils';

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit {
    @Input() advertisement?: Advertisement;
    @Output() formSubmited: Subject<FormGroup> = new Subject<FormGroup>();

    #items$: Observable<IItem[]> = this.store.select(selectItems);
    #localizations$: Observable<Localization[]> = this.store.select(selectLocalizations);
    #definitions$: Observable<AdvertisementDefinition[]> = this.store.select(selectDefinitions);
    vm$ = combineLatest([this.#items$, this.#localizations$, this.#definitions$]).pipe(
        map(([items, localizations, definitions]) => ({ items, localizations, definitions }))
    );
    form: FormGroup = new FormGroup({
        item: new GenericFormControl<IItem>(undefined, [Validators.required]),
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
    });

    get definitionErrorMessage() {
        const control = this.form.controls['definition'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get itemErrorMessage() {
        const control = this.form.controls['item'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get localizationErrorMessage() {
        const control = this.form.controls['localization'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get titleErrorMessage() {
        const control = this.form.controls['title'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    get descriptionErrorMessage() {
        const control = this.form.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private itemService: ItemService,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService
    ) {}

    ngOnInit(): void {}
}
