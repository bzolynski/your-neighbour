import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { GenericFormControl } from '@app-types/generic-form.type';
import { Advertisement, Localization, AdvertisementDefinition, Category } from '@models/';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvertisementFormStore, FormMode } from './advertisement-form.store';

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
    providers: [AdvertisementFormStore],
})
export class AdvertisementFormComponent implements OnInit {
    @Input() advertisement?: Advertisement;
    protected vm$ = combineLatest([
        this.componentStore.localizations$,
        this.componentStore.definitions$,
        this.componentStore.categories$,
        this.componentStore.activeTab$,
        this.componentStore.mode$,
    ]).pipe(
        map(([localizations, definitions, categories, activeTab, mode]) => ({
            localizations,
            definitions,
            categories,
            activeTab,
            mode,
        }))
    );

    protected form: FormGroup = new FormGroup({
        id: new GenericFormControl<number>(undefined),
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        category: new GenericFormControl<Category>(undefined, [Validators.required]),
        dateCreated: new GenericFormControl<Date>(new Date(), [Validators.required]),
    });
    protected get titleErrorMessage() {
        const control = this.form.controls['title'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    protected get descriptionErrorMessage() {
        const control = this.form.controls['description'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    protected get definitionErrorMessage() {
        const control = this.form.controls['definition'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    protected get categoryErrorMessage() {
        const control = this.form.controls['category'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    protected get localizationErrorMessage() {
        const control = this.form.controls['localization'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    protected items: MenuItem[] = [
        {
            label: 'Szczegóły',
        },
        {
            label: 'Zdjęcia',
        },
        {
            label: 'Podsumowanie',
        },
    ];

    constructor(
        private componentStore: AdvertisementFormStore,
        @Optional() private ref?: DynamicDialogRef,
        @Optional() private config?: DynamicDialogConfig
    ) {}
    ngOnInit(): void {
        this.componentStore.setMode({ mode: this.advertisement ? 'edit' : 'create' });
        this.componentStore.loadCategories();
        this.componentStore.loadDefinitions();
        this.componentStore.loadLocalizations();
    }

    protected onLocalizationSelect(event: any) {
        this.form.patchValue({ localization: event.data });
    }

    uploadedFiles: any[] = [];

    submitForm(mode: FormMode): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        if (mode == 'create') {
            this.componentStore.createAdvertisement({
                advertisement: {
                    title: this.form.value['title'],
                    description: this.form.value['description'],
                    categoryId: this.form.value['category'].id,
                    definitionId: this.form.value['definition'].id,
                    localizationId: this.form.value['localization'].id,
                    dateCreated: this.form.value['dateCreated'],
                } as Advertisement,
            });
        } else {
            this.componentStore.updateAdvertisement({
                advertisement: {
                    id: this.form.value['id'],
                    title: this.form.value['title'],
                    description: this.form.value['description'],
                    categoryId: this.form.value['category'].id,
                    definitionId: this.form.value['definition'].id,
                    localizationId: this.form.value['localization'].id,
                } as Advertisement,
            });
        }
    }

    customUploadHandler(event: { files: File[] }): void {
        this.componentStore.uploadimages({ images: event.files });
    }

    closeForm(): void {
        this.ref?.close();
    }

    nextTab(): void {
        this.componentStore.nextTab();
    }
    previousTab(): void {
        this.componentStore.previousTab();
    }
}
