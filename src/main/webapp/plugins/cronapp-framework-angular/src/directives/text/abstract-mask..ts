/**
 * Techne - Cronapp
 *
 * Diretiva utilizada para formatar: números e textos.
 * 
 */
import { HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { parseMaskType } from './mask-utils';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

declare var format: any;

export abstract class AbstractMaskText implements OnInit, ControlValueAccessor {

  private maskValue: string;

  private innerValue: string;

  private isNumber: boolean;

  private removeMask: boolean;

  private onChange = (_: any) => { };

  private onTouched = () => {};

  public constructor(
    protected _element: ElementRef,
    protected _renderer: Renderer2,
    protected _translate: TranslateService
  ) { }

  ngOnInit(): void {
    const attrFormat = this._element.nativeElement.getAttribute('format');
    let attrMaskAsDate = this._element.nativeElement.getAttribute('cron-as-date');
    let attrMask = this._element.nativeElement.getAttribute('mask');
    let type = this._element.nativeElement.getAttribute('type');
    this.maskValue = attrMask || attrMaskAsDate || attrFormat;   
    this.removeMask = false;
    this.isNumber = (type == 'number' || type == 'money' || type == 'integer');

    if (!this.maskValue) {
      this.maskValue = parseMaskType(type, this._translate);
      if (!this.maskValue || this.maskValue == '') {
        return;
      }
    }
    
    if (this.maskValue.endsWith(";0")) {
      this.removeMask = true;
    }

    this.maskValue = this.maskValue.replace(';1', '').replace(';0', '').trim();

    if (this.isNumber) {
      let currency = this.maskValue.trim().replace(/\./g, '').replace(/\,/g, '').replace(/#/g, '').replace(/0/g, '').replace(/9/g, '');
      let prefix = '';
      let suffix = '';
      let thousands = '';
      let decimal = ',';
      let precision = 0;

      if (this.maskValue.startsWith(currency)) {
        prefix = currency;
      } else if (this.maskValue.endsWith(currency)) {
        suffix = currency;
      }

      let pureMask = this.maskValue.trim().replace(prefix, '').replace(suffix, '').trim();
      if (pureMask.startsWith("#.")) {
        thousands = '.';
      } else if (pureMask.startsWith("#,")) {
        thousands = ',';
      }

      let dMask = null;
      if (pureMask.indexOf(",0") != -1) {
        decimal = ',';
        dMask = ",0";
      } else if (pureMask.indexOf(".0") != -1) {
        decimal = '.';
        dMask = ".0";
      }

      if (dMask != null) {
        let strD = pureMask.substring(pureMask.indexOf(dMask) + 1);
        precision = strD.length;
      }

      let inputmaskType = 'numeric';
      if (precision == 0) {
        inputmaskType = 'integer';
      }

      let ipOptions = {
        'rightAlign':  (type == 'money'),
        'unmaskAsNumber': true,
        'allowMinus': true,
        'prefix': prefix,
        'suffix': suffix,
        'radixPoint': decimal,
        'digits': precision
      };

      if (thousands) {
        ipOptions['autoGroup'] = true;
        ipOptions['groupSeparator'] = thousands;
      }
      
      this._element.nativeElement.setAttribute('type', 'text');

     $(this._element.nativeElement).inputmask(inputmaskType, ipOptions);
    } else {
      let maskPlaceholder = this._element.nativeElement.getAttribute('maskPlaceholder');
      let options = {};
      if (maskPlaceholder) {
        options['placeholder'] = maskPlaceholder;
      }

      $(this._element.nativeElement).mask(this.maskValue, options);
    } 
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(e: KeyboardEvent): void {  
    const el: HTMLInputElement = (e.target as HTMLInputElement);
    let unmaskedvalue = el.value;
    
    if (el.value && el.value !== '' && this.maskValue && this.maskValue !== '') {
      if (this.isNumber) {
        unmaskedvalue = $(this._element.nativeElement).inputmask('unmaskedvalue');  
      } else if (this.removeMask) {
        unmaskedvalue = $(this._element.nativeElement).cleanVal();
      }      
    }

    this.onChange(unmaskedvalue);
  }

  get value(): string {    
    return this.innerValue;
  }

  set value(value: string) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  writeValue( value : any ) : void {
    let valueFormated = '';

    if (value && value !=='') {
      if (this.maskValue && this.maskValue !== '') {
        if (this.isNumber) {
          valueFormated = format(this.maskValue, value);
        } else {
          valueFormated = $(this._element.nativeElement).masked(value);
        }
      }
    }
    
    if (value !== this.innerValue) {
      this.innerValue = value;
      this._renderer.setProperty(this._element.nativeElement, 'value', 
            valueFormated != '' ? valueFormated : value ? value : '');
    }
  }

  registerOnChange( fn : any ) : void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
