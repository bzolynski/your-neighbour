import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICategoryDefinition } from '../../core/models';
import { CategoryDefinitionsService } from '../../core/services';

export class CategoryDefinitionAsyncValidators {
	static checkNameExists = (
		categoryDefinition: ICategoryDefinition,
		categoryDefinitionsService: CategoryDefinitionsService
	): AsyncValidatorFn => {
		return (
			control: AbstractControl
		): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
			const debounceTime = 500;
			return timer(debounceTime).pipe(
				switchMap(() => {
					console.log(categoryDefinition.name);

					if (control.value === categoryDefinition.name) return of(null);
					if (!control.value) return of(null);
					return categoryDefinitionsService.checkNameExists(control.value).pipe(
						map((response) => {
							return response.responseObject ? { usernameExists: true } : null;
						})
					);
				})
			);
		};
	};
}
