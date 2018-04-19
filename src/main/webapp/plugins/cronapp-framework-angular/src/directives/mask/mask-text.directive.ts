/**
 * Techne - Cronapp
 *
 * Diretiva utilizada para formatar: datas, números e textos.
 * No caso de tipos data, essa diretiva também exibe um componente do tipo datetimepicker.
 */
import {
  Directive,
  ElementRef
} from '@angular/core';

import { parseMaskType } from './generic-mask';

@Directive({
  selector: '[type="text"][mask]'
})
export class MaskTextDirective {

  constructor(
    protected element: ElementRef
  ) {}

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = 'wheat';
  }
  
}
