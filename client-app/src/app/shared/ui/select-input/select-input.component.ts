import { Component, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectInputComponent,
            multi: true,
        },
    ],
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {
    @ViewChild('select', { read: MatSelect, static: true }) select!: MatSelect;

    @Input() label: string = '';
    @Input() errorMessage: string = '';
    @Input() multiple: boolean = false;
    value: string[] = [];
    required: boolean = false;

    ngOnInit(): void {
        this.select.options = new QueryList<MatOption>();
    }

    onChange = (value: string | string[]) => {};
    onTouch = () => {};

    writeValue(value: string[]): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string | string[]) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    isSelected(valueToCheck: string) {
        return this.value.includes(valueToCheck);
    }

    updateValue = (value: string) => {
        if (this.multiple) this.updateMultiple(value);
        else this.updateSingle(value);
        this.onTouch();
    };

    private updateMultiple = (selectedValue: string) => {
        const index = this.value.indexOf(selectedValue);

        if (index > -1) {
            this.value = [...this.value.slice(0, index), ...this.value.slice(index + 1)];
        } else {
            this.value = [...this.value, selectedValue];
        }
        this.onChange(this.value);
    };

    private updateSingle = (selectedValue: string) => {
        this.onChange(selectedValue);
    };
}
