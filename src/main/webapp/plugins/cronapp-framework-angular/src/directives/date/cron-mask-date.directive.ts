import {
  Directive,
  ElementRef,
  forwardRef
} from '@angular/core';

import { TranslateService } from "@ngx-translate/core";

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractDate } from './abstract-date';

@Directive({
  selector: '[type="date"][cron-as-date]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CronMaskDateDirective), multi: true}
  ]
})
export class CronMaskDateDirective extends AbstractDate {

  constructor(
    protected element: ElementRef,
    protected translate: TranslateService
  ) {
    super(element, translate);
  }

}