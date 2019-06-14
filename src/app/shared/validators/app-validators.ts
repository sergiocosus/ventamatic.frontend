import { AbstractControl, Validators } from '@angular/forms';
import { isArray } from 'util';

export class AppValidators {
  static slug(control: AbstractControl) {
    const re = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    return re.test(control.value) ? null : {slug: true};
  }

  static type(theClasses: any) {
    if (!isArray(theClasses)) {
      theClasses = [theClasses];
    }

    return (control: AbstractControl) => {
      return control.value &&
      theClasses.find(theClass => control.value instanceof theClass) ?
        null :
        {type: true};
    };
  }

  static value(value: any) {
    return (control: AbstractControl) => {
      return control.value === value ?
        null :
        {value: true};
    };
  }

  static rfc(control: AbstractControl) {
    if (!control.value || control.value === '') {
      return;
    }

    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

    return control.value.match(re) ?
      null :
      {rfc_format: true};
  }

  static clabe(control: AbstractControl) {
    // Avoid validations if it is empty
    if (!control.value || !control.value.length) {
      return null;
    }

    const re = /^(\d{18})$/;
    return control.value && control.value.match(re) ?
      null :
      {clabe_format: true};
  }

  static curp(control: AbstractControl) {
    if (!control.value || control.value === '') {
      return;
    }

    const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    return control.value && control.value.toUpperCase().match(re) ?
      null :
      {curp_format: true};
  }

  static nss(control: AbstractControl) {
    const rfcPattern = /^(\d{2})(\d{2})(\d{2})\d{5}$/;
    return Validators.pattern(rfcPattern)(control);
  }

  static password(control: AbstractControl) {
    // Avoid validations if it is empty
    if (!control.value.length) {
      return null;
    }

    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return control.value && control.value.match(re) ?
      null :
      {password_format: true};
  }

  static passwordConfirm(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value; // to get value in input tag
    const confirmPassword = abstractControl.get('password_confirmation').value; // to get value in input tag
    if (password !== confirmPassword) {
      abstractControl.get('password_confirmation').setErrors({password_mismatch: true});
    } else {
      return null;
    }
  }

  static fieldAfterThan(beginField: string, endField: string) {
    return (abstractControl: AbstractControl) => {
      const begin = abstractControl.get(beginField);
      const end = abstractControl.get(endField);

      if (end.value < begin.value) {
        end.setErrors({after_than: true});
      } else {
        return null;
      }
    };
  }

  static minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min)
        return null;

      return {'minLengthArray': {valid: false}};
    };
  }

  static notInStringArray(values: string[]) {
    return (c: AbstractControl): { [key: string]: boolean } => {
      if (values.includes(String(c.value))) {
        return {'notInArray': true};
      } else {
        return null;
      }
    };
  }
}
