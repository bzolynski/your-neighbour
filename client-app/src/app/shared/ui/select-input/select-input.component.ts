import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    Input,
    OnChanges,
    OnInit,
    Self,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive({
    selector: '[appSelectInputSelectedTemplate]',
})
export class SelectInputSelectedTemplateDirective {}

@Directive({
    selector: '[appSelectInputItemTemplate]',
})
export class SelectInputItemTemplateDirective {}

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements OnInit, OnChanges, AfterContentChecked, ControlValueAccessor {
    @ContentChild(SelectInputSelectedTemplateDirective, { read: TemplateRef }) selectedTemplate?: TemplateRef<any>;
    @ContentChild(SelectInputItemTemplateDirective, { read: TemplateRef }) itemTemplate?: TemplateRef<any>;

    @Input() formControlName: string = '';
    @Input() filterMatchMode: string = 'contains';
    @Input() filterBy: string = 'id';
    @Input() optionLabel: string = 'name';
    @Input() options: any[] = [];
    @Input() filter: boolean = false;
    @Input() showClear: boolean = false;
    @Input() label: string = '';
    @Input() errorMessage: string = '';
    @Input() multiple: boolean = false;
    @Input() placeholder: string = '';
    @Input() showError: boolean = true;
    @Input() disabledInput: boolean = false;
    required: boolean = false;

    get control(): FormControl {
        return this.controlDir.control as FormControl;
    }
    constructor(@Self() public controlDir: NgControl, private cdr: ChangeDetectorRef) {
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
    ngAfterContentChecked() {
        this.cdr.detectChanges();
    }
    onChange = (value: string | string[]) => {};
    onTouch = () => {};

    writeValue(value: string[]): void {}

    registerOnChange(fn: (value: string | string[]) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }
}
