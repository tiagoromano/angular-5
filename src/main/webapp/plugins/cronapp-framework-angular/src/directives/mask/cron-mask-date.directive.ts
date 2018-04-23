import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  forwardRef,
  ChangeDetectorRef,
  KeyValueDiffers,
  Renderer2,
  NgZone
} from '@angular/core';

import { TranslateService } from "@ngx-translate/core";

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractDate } from './abstract-date.directive';

@Directive({
  selector: '[cron-as-date]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CronMaskDateDirective), multi: true}
  ]
})
export class CronMaskDateDirective extends AbstractDate {

  constructor(
    protected changeDetector: ChangeDetectorRef,
    protected element: ElementRef,
    protected differs: KeyValueDiffers,
    protected renderer: Renderer2,
    protected translate: TranslateService,
    protected zone: NgZone
  ) {
    super(changeDetector, element, differs, renderer, translate, zone);
  }

}