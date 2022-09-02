import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Advertisement, Localization, AdvertisementDefinition, Category, Image } from '@models/';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { AdvertisementDefinitionService } from 'src/app/shared/data-access/api';
import { GenericFormControl } from 'src/app/shared/utils';

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit {
    @Input() advertisement?: Advertisement;
    @Output() formSubmited: Subject<FormGroup> = new Subject<FormGroup>();

    #localizations$: Observable<Localization[]> = this.localizationService.getManyByUser(1);
    #definitions$: Observable<AdvertisementDefinition[]> = this.advertisementDefinitionService.getMany();
    #categories$: Observable<Category[]> = this.categoryService.getMany();
    vm$ = combineLatest([this.#localizations$, this.#definitions$, this.#categories$]).pipe(
        map(([localizations, definitions, categories]) => ({ localizations, definitions, categories }))
    );
    form: FormGroup = new FormGroup({
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        category: new GenericFormControl<Category>(undefined, [Validators.required]),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        images: new GenericFormControl<Image[]>([], [Validators.required]),
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
        private localizationService: LocalizationService,
        private categoryService: CategoryService,
        private advertisementDefinitionService: AdvertisementDefinitionService
    ) {}

    ngOnInit(): void {}
}
