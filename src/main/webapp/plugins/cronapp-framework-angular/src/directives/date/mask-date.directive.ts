import {
  Directive,
  ElementRef,
  forwardRef
} from '@angular/core';

import { TranslateService } from "@ngx-translate/core";

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractDate } from './abstract-date.directive';

@Directive({
  selector: '[type="date"][mask]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MaskDateDirective), multi: true}
  ]
})
export class MaskDateDirective extends AbstractDate {

  constructor(
    protected element: ElementRef,
    protected translate: TranslateService
  ) {
    super(element, translate);
  }

}