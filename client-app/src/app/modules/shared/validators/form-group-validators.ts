import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export class FormGroupValidators {
    static checkEqual = (
        mainControlName: string,
        checkControlNames: Array<string>
    ): ValidatorFn => {
        return (group: AbstractControl): ValidationErrors | null => {
            if (!(group instanceof FormGroup))
                throw new Error(
                    'Invalid AbstractControl type (must be FormGroup)'
                );
            const mainControl = group.get(mainControlName);
            const checkControls = checkControlNames.map((name) =>
                group.get(name)
            );

            if (
                !checkControls.every(
                    (control) => mainControl?.value == control?.value
                )
            )
                mainControl?.setErrors({
                    ...mainControl.errors,
                    notEqual: true,
                });
            else {
                if (mainControl?.hasError('notEqual'))
                    delete mainControl!.errors!['notEqual'];
                if (
                    mainControl?.errors &&
                    Object.keys(mainControl.errors).length == 0
                )
                    mainControl?.setErrors(null);
            }
            return null;
        };
    };
}
