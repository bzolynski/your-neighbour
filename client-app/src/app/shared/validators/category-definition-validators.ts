import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService } from '@services/.';

@Injectable()
export class CategoryDefinitionAsyncValidators {
    constructor(private categoryDefinitionsService: CategoryDefinitionsService) {}
    checkNameExists = (): AsyncValidatorFn => {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const debounceTime = 500;
            return timer(debounceTime).pipe(
                switchMap(() => {
                    if (!control.value) return of(null);
                    return this.categoryDefinitionsService.checkNameExists(control.value).pipe(
                        map((response) => {
                            return response ? { usernameExists: true } : null;
                        })
                    );
                })
            );
        };
    };
}
