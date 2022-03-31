import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

type WrapProp = 'hard' | 'soft' | 'off';

@Component({
    selector: 'app-text-area-input',
    templateUrl: './text-area-input.component.html',
    styleUrls: ['./text-area-input.component.scss'],
})
export class TextAreaInputComponent implements OnInit, ControlValueAccessor {
    // Public properties
    @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;
    @Input() formControlName: string = '';
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() errorMessage: string = '';
    @Input() rows?: number;
    @Input() cols?: number;
    @Input() wrap?: WrapProp;
    get control(): FormControl {
        return this.controlDir.control as FormControl;
    }
    required: boolean = false;

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }

    ngOnInit(): void {
        const control = this.controlDir.control;
        const validators = control?.validator ? [control.validator] : [];
        const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

        control?.setValidators(validators);
        control?.setAsyncValidators(asyncValidators);
        control?.updateValueAndValidity;

        this.required = control?.errors?.required ?? false;
    }

    onChange = (value: string) => {};

    onTouched = () => {};

    writeValue(obj: any): void {
        this.input.nativeElement.value = obj || '';
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
