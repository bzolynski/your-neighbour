import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-accordion-select',
    templateUrl: './accordion-select.component.html',
    styleUrls: ['./accordion-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AccordionSelectComponent,
            multi: true,
        },
    ],
})
export class AccordionSelectComponent<T> implements OnInit, ControlValueAccessor {
    @Input() label: string = '';
    @Input() description: string = '';
    @Input() errorMessage: string = '';
    @Input() multiple: boolean = false;
    value?: T | T[];
    expanded: boolean = false;

    ngOnInit(): void {
        if (this.multiple) this.value = [];
        else this.value = undefined;
    }

    onChange = (value: any) => {};
    onTouch = () => {};

    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }
    isSelected = (valueToCheck: T): boolean => {
        if (!this.value) return false;
        if (Array.isArray(this.value)) return this.value.includes(valueToCheck);
        return this.value == valueToCheck;
    };

    updateValue = (value: T) => {
        if (this.multiple) this.updateMultiple(value);
        else this.updateSingle(value);
        this.onTouch();
    };

    private updateMultiple = (selectedValue: T) => {
        if (!Array.isArray(this.value)) return;
        if (!this.value) this.value = [];
        const index = this.value.indexOf(selectedValue) ?? -1;

        if (index > -1) {
            this.value = [...(this.value.slice(0, index) ?? []), ...this.value.slice(index + 1)];
        } else {
            this.value = [...(this.value ?? []), selectedValue];
        }
        this.onChange(this.value);
    };

    private updateSingle = (selectedValue: T) => {
        this.value = selectedValue;
        this.onChange(selectedValue);
    };
}
