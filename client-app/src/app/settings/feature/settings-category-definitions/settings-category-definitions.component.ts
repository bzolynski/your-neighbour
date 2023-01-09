import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { GenericFormControl } from '@core/types/generic-form.type';
import { CategoryDefinition } from '@core/models/category-definition.model';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormMode, SettingsCategoryDefinitionsStore } from './settings-category-definitions.store';

@Component({
    selector: 'app-settings-category-definitions',
    templateUrl: './settings-category-definitions.component.html',
    styleUrls: ['./settings-category-definitions.component.scss'],
    providers: [SettingsCategoryDefinitionsStore],
})
export class SettingsCategoryDefinitionsComponent implements OnInit {
    vm$ = combineLatest([
        this.componentStore.definitions$,
        this.componentStore.formOpen$,
        this.componentStore.formStatus$,
        this.componentStore.formMode$,
    ]).pipe(
        map(([definitions, formOpen, formStatus, formMode]) => ({
            definitions,
            formOpen,
            formStatus,
            formMode,
        }))
    );
    form: FormGroup = new FormGroup({
        id: new GenericFormControl<number>(undefined),
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        displayName: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        isActive: new GenericFormControl<boolean>(true),
    });

    get nameErrorMessage() {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;
        return '';
    }
    get displayNameErrorMessage() {
        const control = this.form.controls['displayName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    constructor(private componentStore: SettingsCategoryDefinitionsStore, private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.componentStore.loadDefinitions();
    }

    deleteDefinition(definition: CategoryDefinition) {
        this.confirmationService.confirm({
            message: `Czy na pewno chcesz usunąć definicję kategorii ${definition.displayName}?`,
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.componentStore.deleteDefinition({ id: definition.id });
            },
        });
    }

    editDefinition(definition: CategoryDefinition): void {
        this.form.patchValue({
            id: definition.id,
            name: definition.name,
            displayName: definition.displayName,
            isActive: definition.isActive,
        });
        this.componentStore.setFormOpen({ open: true, mode: 'edit' });
    }

    createDefinition(): void {
        this.componentStore.setFormOpen({ open: true, mode: 'create' });
    }

    closeForm(): void {
        this.form.reset();
        this.componentStore.setFormOpen({ open: false });
    }

    submitForm(formMode?: FormMode): void {
        this.form.markAllAsTouched();
        if (!this.form.valid || !formMode) return;
        if (formMode === 'create') {
            this.componentStore.createDefinition({
                definition: {
                    name: this.form.value['name'],
                    displayName: this.form.value['displayName'],
                    isActive: this.form.value['isActive'],
                } as CategoryDefinition,
            });
        } else {
            this.componentStore.updateDefinition({
                definition: {
                    name: this.form.value['name'],
                    displayName: this.form.value['displayName'],
                    isActive: this.form.value['isActive'],
                } as CategoryDefinition,
                id: this.form.value['id'],
            });
        }
    }
}
