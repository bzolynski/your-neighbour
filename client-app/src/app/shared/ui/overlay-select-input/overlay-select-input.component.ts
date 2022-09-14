import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    Self,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
@Directive({
    selector: '[appOverlaySelectInputSelectedTemplate]',
})
export class OverlaySelectInputSelectedTemplateDirective {}

@Directive({
    selector: '[appOverlaySelectInputHeaderTemplate]',
})
export class OverlaySelectInputHeaderTemplateDirective {}

@Directive({
    selector: '[appOverlaySelectInputRowTemplate]',
})
export class OverlaySelectInputRowTemplateDirective {}

@Component({
    selector: 'app-overlay-select-input',
    templateUrl: './overlay-select-input.component.html',
    styleUrls: ['./overlay-select-input.component.scss'],
})
export class OverlaySelectInputComponent<T> implements OnInit, OnChanges, AfterContentChecked, ControlValueAccessor {
    @HostListener('click') onClick() {
        this.control.markAsTouched();
    }
    @ContentChild(OverlaySelectInputSelectedTemplateDirective, { read: TemplateRef }) selectedTemplate?: TemplateRef<any>;
    @ContentChild(OverlaySelectInputHeaderTemplateDirective, { read: TemplateRef }) headerTemplate?: TemplateRef<any>;
    @ContentChild(OverlaySelectInputRowTemplateDirective, { read: TemplateRef }) rowTemplate?: TemplateRef<any>;
    @Input() formControlName: string = '';
    @Input() label: string = '';
    @Input() errorMessage: string = '';
    @Input() multiple: boolean = false;
    @Input() placeholder: string = '';
    @Input() showError: boolean = true;
    @Input() disabledInput: boolean = false;

    @Input() data: T[] = [];
    @Input() valueSelector?: (item: T) => any;
    required: boolean = false;
    overlayOpen: boolean = false;

    get control(): FormControl {
        return this.controlDir.control as FormControl;
    }
    constructor(@Self() public controlDir: NgControl, private cdr: ChangeDetectorRef, private renderer: Renderer2) {
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
    onChange = (data: any) => {};
    onTouch = () => {
        this.control.markAsTouched();
    };

    writeValue(data: any): void {}

    registerOnChange(fn: (data: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }
}
