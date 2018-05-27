import {
  ElementRef,
  OnInit
} from '@angular/core';

import { ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

export class AbstractDate implements OnInit, ControlValueAccessor {
  
  constructor(protected element: ElementRef,
              protected translate: TranslateService) {}

  protected datetimepicker: any;

  protected USE_UTC: any;

  protected mask: any;

  protected innerValue: any;
 
  ngOnInit(): void {
    const attrFormat = this.element.nativeElement.getAttribute('format');
    let attrMaskAsDate = this.element.nativeElement.getAttribute('cron-as-date');
    let attrMask = this.element.nativeElement.getAttribute('mask');
    let type = this.element.nativeElement.getAttribute('type');
    this.USE_UTC = type == 'date' || type == 'datetime' || type == 'time';
    this.mask = this.formatMask(attrMask || attrMaskAsDate || attrFormat || 'dd/MM/yyyy ');   
    
    this.renderise();
  }

  renderise() {
    let isDateTime = this.mask.includes('H') || this.mask.includes('m') || this.mask.includes('s');
    let $element = $(this.element.nativeElement);
    let _self = this;
    
    const config = {
      value: new Date(),
      format: _self.mask,
      culture: this.formatCulture(this.translate.currentLang),
      dateInput: true,
      change: function() {
        var momentDate = null;

        if (this.USE_UTC) {
          momentDate = moment.utc(this.value(), _self.mask);
        } else {
          momentDate = moment(this.value(), _self.mask);
        }

        if (momentDate.isValid()) {
           _self.value = momentDate.toDate();
        }                          
      }
    }

    if (isDateTime) {
      this.datetimepicker = $element.kendoDateTimePicker(config).data("kendoDateTimePicker");
    } else {
      this.datetimepicker = $element.kendoDatePicker(config).data("kendoDatePicker");      
    }
  }

  formatCulture(culture) {
    culture = culture.replace(/_/gm,'-');
    let parts = culture.split('-');    
    parts[parts.length - 1] = parts[parts.length - 1].toUpperCase();
    return parts.join('');
  }

  formatMask(mask) {
    if (mask) {
      mask = mask.replace(/:MM/gm,':mm');
      mask = mask.replace(/:M/gm,':m');
      mask = mask.replace(/S/gm,'s');
      mask = mask.replace(/D/gm,'d');
      mask = mask.replace(/Y/gm,'y');
    }

    return mask;
  }

  onChange = (value: any) => {};
  onTouched = () => {};
 
  get value(): any {    
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  writeValue(value: any) {
    if (value) {
      let momentDate = null;
      if (this.USE_UTC) {
        momentDate = moment.utc(moment(value), this.mask);
      } else {
        momentDate = moment(value, this.mask);
      }

      if (momentDate.isValid()) {
        value = momentDate.toDate();
      }                          
    }

    if (value !== this.innerValue) {
      this.innerValue = value;
      this.datetimepicker.value(value);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}