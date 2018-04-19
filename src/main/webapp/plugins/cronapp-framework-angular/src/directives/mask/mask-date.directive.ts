import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  EventEmitter,
  Output,
  forwardRef,
  ChangeDetectorRef,
  KeyValueDiffer,
  KeyValueDiffers,
  DoCheck,
  OnDestroy, 
  Renderer2,
  NgZone
} from '@angular/core';

import { TranslateService } from "@ngx-translate/core";

import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

declare var $: any;

import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';

import * as moment from 'moment';

import { parseMaskType } from './generic-mask';

@Directive({
  selector: '[type="date"][mask]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MaskDateDirective), multi: true}
  ]
})
export class MaskDateDirective implements OnInit, OnDestroy, DoCheck {

  _value: moment.Moment;

  private _options: datetimepicker.SetOptions = {};

  @Input() set options(value) {
    if (value !== null) {
      this._options = value;
    }
  }

  get options(): datetimepicker.SetOptions {
    return this._options;
  } 

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  datepicker: datetimepicker.Datetimepicker; 

  private dpinitialized: boolean = false;

  private dpElement;

  private optionsDiffer: KeyValueDiffer<string, any>;

  private _onChange: any = () => {};

  private USE_UTC;

  private mask;

  constructor(
    private changeDetector: ChangeDetectorRef,
    protected element: ElementRef,
    private differs: KeyValueDiffers,
    private renderer: Renderer2,
    private translate: TranslateService,
    private zone: NgZone
  ) {
    let $parent = $(element.nativeElement.parentNode);
    this.dpElement = $parent.hasClass('input-group') ? $parent : $(element.nativeElement);
  }

  ngOnInit(): void {
    const attrAsDate = this.element.nativeElement.getAttribute('asDate');
    const attrFormat = this.element.nativeElement.getAttribute('format');
    let attrMask = this.element.nativeElement.getAttribute('mask');
    let type = this.element.nativeElement.getAttribute('type');

    if (type == 'checkbox' || type == 'password') {
      return;
    }

    this.dpElement.data("type", type);
    this.dpElement.attr('type', 'text');

    if ((attrAsDate !== null && type == 'text') || (type == null)) {
      type = 'date';
    }

    this.mask = attrMask || attrFormat;
    if (!this.mask) {
      this.mask = parseMaskType(type, this.translate);
    } 

    this.options = this.getOptions(this.mask);
    this.dpinitialized = true;
    this.dpElement.wrap('<div style=\"position:relative\"></div>');
    
    this.dpElement.datetimepicker(this.options);
    this.datepicker = this.dpElement.data('DateTimePicker');
    this.datepicker.date(this.value);

    this.USE_UTC = type == 'date' || type == 'datetime' || type == 'time';

    this.dpElement.on('dp.change', (e) => {
      if (e.date !== this.value) {
        this.value = e.date;
        $(this).trigger('change');
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            var value = this.dpElement.val();
            var momentDate = null;
            
            if (this.USE_UTC) {
              momentDate = moment.utc(value, this.mask);
            } else {
              momentDate = moment(value, this.mask);
            }

            if (momentDate.isValid()) {
              this.value = momentDate.toDate();
            }
          }, 300);
        });
      }
    });

    this.dpElement.on('click', () => this.onClick.emit());
    this.optionsDiffer = this.differs.find(this.options).create();
  }

  get value() {
    return this._value || null;
  }

  set value(val) {
    if (val) {

      var momentDate = null;
      if (this.USE_UTC) {
        momentDate = moment.utc(val, this.mask);
      } else {
        momentDate = moment(val, this.mask);
      }

      val = momentDate.toDate();
    }

    this._value = val;
    this._onChange(val);
    this.changeDetector.markForCheck();
  }

  writeValue(value) {
    this.value = value;
    this.setDpValue(value);
  }

  registerOnChange(fn) {
    this._onChange = fn;
  }

  registerOnTouched() {}

  private setDpValue(val: string) {
    if (!this.dpinitialized) {
      return;
    }

    if (val) {
      this.datepicker.date(this.value);
    } else {
      this.datepicker.clear();
    }
  }

  private getOptions(mask) {
    const options = {
      format: mask,
      locale: this.translate.currentLang,
      showTodayButton: true,
      useStrict: true,
      sideBySide: false,
      tooltips: {
        today: this.translate.instant('DatePicker.today'),
        clear: this.translate.instant('DatePicker.clear'),
        close: this.translate.instant('DatePicker.close'),
        selectMonth: this.translate.instant('DatePicker.selectMonth'),
        prevMonth: this.translate.instant('DatePicker.prevMonth'),
        nextMonth: this.translate.instant('DatePicker.nextMonth'),
        selectYear: this.translate.instant('DatePicker.selectYear'),
        prevYear: this.translate.instant('DatePicker.prevYear'),
        nextYear: this.translate.instant('DatePicker.nextYear'),
        selectDecade: this.translate.instant('DatePicker.selectDecade'),
        prevDecade: this.translate.instant('DatePicker.prevDecade'),
        nextDecade: this.translate.instant('DatePicker.nextDecade'),
        prevCentury: this.translate.instant('DatePicker.prevCentury'),
        nextCentury: this.translate.instant('DatePicker.nextCentury')
      }
    };

    if (mask != 'DD/MM/YYYY' && mask != 'MM/DD/YYYY') {
      options.sideBySide = true;
    }

    return options;
  }

  ngDoCheck() {
    if (this.dpinitialized) {
      const changes = this.optionsDiffer.diff(this.options);
      if (changes) {
        $.map(this.options, (value, key) => {
          this.datepicker[key](value);
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.datepicker.destroy();
  }

}