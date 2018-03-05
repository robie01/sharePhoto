import {AbstractControl, ValidatorFn} from '@angular/forms';

export function matchPassword(): ValidatorFn {
  return (repeatPassword: AbstractControl): {[key: string]: any} => {
    const formGroup = repeatPassword.parent;
    if (formGroup) {
      const password = formGroup.get('password');
      return password.value !== repeatPassword.value ? {'no-match': {value: repeatPassword.value}} : null;
    }
    return null;
  };
}
