import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Valid } from './valid';

@Directive({
  selector: '[valid]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDirective, multi: true}]
})
export class ValidDirective implements Validator {

  @Input('valid') valid: string;

  constructor(private element: ElementRef) {}

  validate(ctrl: FormControl): {[key: string]: any} {
    return new Valid().validate(this.element, ctrl, this.valid);
  }

}
