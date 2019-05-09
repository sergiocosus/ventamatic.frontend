import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

// Array Validators
export class AppValidators {

  // max length
  public static maxLength(max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length > max ? { maxLength: true } : null;
    }
  }

  // min length
  public static minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min ? { minLength: true } : null;
    }
  }
}
