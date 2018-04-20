import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { CPF } from './cpf';
import { CNPJ } from './cnpj';

export class Valid {

  constructor() {}

  public validate(element: ElementRef, ctrl: FormControl, type): {[key: string]: any} {
    if (type) {
      let isValid = false;

      switch (type.toLowerCase()) {
        case 'cpf':
          isValid = new CPF ().isValid(ctrl.value);
          break;
        case 'cnpj':
          isValid = new CNPJ ().isValid(ctrl.value);
          break;
        default:
          return null;
      }

      if (!isValid) {
        const dataErrorMessage = element.nativeElement.getAttribute('data-error-message');
        element.nativeElement.setCustomValidity(dataErrorMessage);
        return {
          valid : true
        };
      } else {
        element.nativeElement.setCustomValidity('');
        return null;
      }
    } else {
      return null;
    }
  }
}
