import { ElementRef, forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR  } from '@angular/forms';
import { AbstractQrCode } from './abstract-qrcode';

@Directive({
  selector: '[qr]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => QrCodeDirective), multi: true}
  ]
})
export class QrCodeDirective extends AbstractQrCode {  
    
    constructor(protected element: ElementRef) {
        super(element);
    }

}
