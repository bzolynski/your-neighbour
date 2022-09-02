import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

interface GenericFormGroupControlsType {
    [key: string]: AbstractControl;
}

export class GenericFormGroup<T extends GenericFormGroupControlsType> extends FormGroup {
    value!: any;
    constructor(
        controls: T,
        alidatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null | undefined,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined
    ) {
        super(controls, alidatorOrOpts, asyncValidator);
    }
}

export class GenericFormControl<T> extends FormControl {
    value: T | undefined;
    constructor(
        formState?: T | undefined,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null | undefined,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined
    ) {
        super(formState, validatorOrOpts, asyncValidator);
    }
}
