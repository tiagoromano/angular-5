import { ElementRef, forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR  } from '@angular/forms';
import { AbstractQrCode } from './abstract-qrcode';

@Directive({
  selector: '[cron-qr]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CronQrCodeDirective), multi: true}
  ]
})
export class CronQrCodeDirective extends AbstractQrCode {

  constructor(protected element: ElementRef) {
    super(element);
  }

}
