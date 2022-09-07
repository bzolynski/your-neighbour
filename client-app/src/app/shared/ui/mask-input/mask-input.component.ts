import { Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-mask-input',
    templateUrl: './mask-input.component.html',
    styleUrls: ['./mask-input.component.scss'],
})
export class MaskInputComponent implements OnInit, OnChanges, ControlValueAccessor {
    // @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;
    @Input() formControlName: string = '';
    @Input() type: string = 'text';
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() errorMessage: string = '';
    @Input() hideError: boolean = false;
    @Input() disabledInput: boolean = false;
    @Input() showError: boolean = true;
    @Input() mask: string = '';
    @Input() characterPattern: string = '';
    @Input() autoFocus: boolean = false;
    required: boolean = false;
    get control(): FormControl {
        return this.controlDir.control as FormControl;
    }
    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }
    ngOnChanges({ disabledInput }: SimpleChanges): void {
        if (disabledInput) {
            if (disabledInput.currentValue) this.control.disable();
            else this.control.enable();
        }
    }
    ngOnInit(): void {
        const control = this.controlDir.control;
        const validators = control?.validator ? [control.validator] : [];
        const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

        control?.setValidators(validators);
        control?.setAsyncValidators(asyncValidators);
        control?.updateValueAndValidity;

        this.required = control?.errors?.['required'] ?? false;
    }

    onChange = (value: string) => {};

    onTouched = () => {};

    writeValue(obj: any): void {
        // this.input?.nativeElement.value = obj || '';
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
