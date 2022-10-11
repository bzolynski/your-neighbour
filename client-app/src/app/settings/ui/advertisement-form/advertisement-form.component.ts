import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { GenericFormControl } from '@core/types/generic-form.type';
import { Advertisement, Localization, AdvertisementDefinition, Category } from '@core/models/';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdvertisementFormStore, FormMode } from './advertisement-form.store';

@Component({
    selector: 'app-advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls: ['./advertisement-form.component.scss'],
    providers: [AdvertisementFormStore, ConfirmationService],
})
export class AdvertisementFormComponent implements OnInit {
    advertisement$ = this.componentStore.advertisement$.pipe(
        tap((advertisement) => {
            if (advertisement) {
                this.form.patchValue({ ...advertisement });
            }
        })
    );
    protected vm$ = combineLatest([
        this.advertisement$,
        this.componentStore.localizations$,
        this.componentStore.definitions$,
        this.componentStore.categories$,
        this.componentStore.status$,
        this.componentStore.mode$,
    ]).pipe(
        map(([advertisement, localizations, definitions, categories, status, mode]) => ({
            advertisement,
            localizations,
            definitions,
            categories,
            status,
            mode,
        }))
    );

    protected form: FormGroup = new FormGroup({
        title: new GenericFormControl<string>('', [Validators.required]),
        description: new GenericFormControl<string>('', [Validators.required]),
        definition: new GenericFormControl<AdvertisementDefinition>(undefined, [Validators.required]),
        localization: new GenericFormControl<Localization>(undefined, [Validators.required]),
        category: new GenericFormControl<Category>(undefined, [Validators.required]),
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

    constructor(
        private componentStore: AdvertisementFormStore,
        private confirmationService: ConfirmationService,
        @Optional() private ref?: DynamicDialogRef,
        @Optional() private config?: DynamicDialogConfig
    ) {}
    ngOnInit(): void {
        const id: number | undefined = this.config?.data?.id;
        if (id) {
            this.componentStore.loadAdvertisement({ id });
            this.componentStore.setMode({ mode: 'edit' });
        } else {
            this.componentStore.setMode({ mode: 'create' });
        }
        this.componentStore.loadCategories();
        this.componentStore.loadDefinitions();
        this.componentStore.loadLocalizations();
    }

    protected onLocalizationSelect(event: any) {
        this.form.patchValue({ localization: event.data });
    }
    submitForm(mode: FormMode): void {
        this.form.markAllAsTouched();
        console.log('XDDD');
        if (!this.form.valid) return;

        if (mode == 'create') {
            this.componentStore.createAdvertisement({
                advertisement: {
                    title: this.form.value['title'],
                    description: this.form.value['description'],
                    categoryId: this.form.value['category'].id,
                    definitionId: this.form.value['definition'].id,
                    localizationId: this.form.value['localization'].id,
                    dateCreated: new Date(),
                } as Advertisement,
            });
        } else {
            this.componentStore.updateAdvertisement({
                advertisement: {
                    title: this.form.value['title'],
                    description: this.form.value['description'],
                    categoryId: this.form.value['category'].id,
                    definitionId: this.form.value['definition'].id,
                    localizationId: this.form.value['localization'].id,
                } as Advertisement,
            });
        }
    }

    customUploadHandler(event: { files: File[] }, fileUpload: FileUpload): void {
        this.componentStore.uploadImages({ images: event.files, fileUpload: fileUpload });
    }

    deleteImage(id: number) {
        this.confirmationService.confirm({
            message: 'Czy na pewno chcesz to zdjęcie?',
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.componentStore.deleteImage(id);
            },
        });
    }

    setMainImage(id: number) {
        this.componentStore.setMainImage(id);
    }

    closeForm(): void {
        this.ref?.close();
    }
}
