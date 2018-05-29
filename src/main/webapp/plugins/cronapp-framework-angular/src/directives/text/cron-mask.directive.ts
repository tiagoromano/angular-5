/**
 * Techne - Cronapp
 *
 * Diretiva utilizada para formatar: números e textos.
 * 
 */
import { Directive, forwardRef, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AbstractMaskText } from './abstract-mask.';

@Directive({
  selector: ':not[type="date"],[cron-mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CronMaskTextDirective),
      multi: true
    }
  ],
})
export class CronMaskTextDirective extends AbstractMaskText {

  public constructor(
    protected _element: ElementRef,
    protected _renderer: Renderer2,
    protected _translate: TranslateService) { 
      super(_element, _renderer, _translate);
  }

}
