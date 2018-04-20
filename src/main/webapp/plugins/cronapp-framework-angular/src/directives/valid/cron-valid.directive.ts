import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Valid } from './valid';

@Directive({
  selector: '[cron-valid]',
  providers: [{provide: NG_VALIDATORS, useExisting: CronValidDirective, multi: true}]
})
export class CronValidDirective implements Validator {

  @Input('cron-valid') valid: string;

  constructor(private element: ElementRef) {}

  validate(ctrl: FormControl): {[key: string]: any} {
    return new Valid().validate(this.element, ctrl, this.valid);
  }
}
