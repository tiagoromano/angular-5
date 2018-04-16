import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { CPF } from './cpf';
import { CNPJ } from './cnpj';

@Directive({
  selector: '[valid]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDirective, multi: true}]
})
export class ValidDirective implements Validator {

  @Input('valid') valid: string;

  constructor(private element: ElementRef) {}

  validate(ctrl: FormControl): {[key: string]: any} {
    if (this.valid) {
      let isValid = false;

      switch (this.valid.toLowerCase()) {
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
        const dataErrorMessage = this.element.nativeElement.getAttribute('data-error-message');
        this.element.nativeElement.setCustomValidity(dataErrorMessage);
        return {
          valid : true
        };
      } else {
        this.element.nativeElement.setCustomValidity(null);
        return null;
      }
    } else {
      return null;
    }
  }
}
