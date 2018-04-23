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

declare var $: any;

import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';

import * as moment from 'moment';

import { parseMaskType } from './mask-util';

import { buildOptions } from './mask-util';

export abstract class AbstractDate implements OnInit, OnDestroy, DoCheck {

  _value: moment.Moment;

  protected _options: datetimepicker.SetOptions = {};

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

  protected dpinitialized: boolean = false;

  protected dpElement;

  protected optionsDiffer: KeyValueDiffer<string, any>;

  protected _onChange: any = () => {};

  protected USE_UTC;

  protected mask;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    protected element: ElementRef,
    protected differs: KeyValueDiffers,
    protected renderer: Renderer2,
    protected translate: TranslateService,
    protected zone: NgZone
  ) {
    let $parent = $(element.nativeElement.parentNode);
    this.dpElement = $parent.hasClass('input-group') ? $parent : $(element.nativeElement);
  }

  ngOnInit(): void {
    const attrFormat = this.element.nativeElement.getAttribute('format');
    let attrMaskAsDate = this.element.nativeElement.getAttribute('cron-as-date');
    let attrMask = this.element.nativeElement.getAttribute('mask');
    let type = this.element.nativeElement.getAttribute('type');

    if (type == 'checkbox' || type == 'password') {
      return;
    }

    if (attrMaskAsDate != null) {
      attrMask=attrMaskAsDate;
    }

    this.dpElement.data("type", type);
    this.dpElement.attr('type', 'text');

    this.mask = attrMask || attrFormat;
    if (!this.mask) {
      this.mask = parseMaskType(type, this.translate);
    } 

    this.options = buildOptions(this.mask, this.translate);
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

  protected setDpValue(val: string) {
    if (!this.dpinitialized) {
      return;
    }

    if (val) {
      this.datepicker.date(this.value);
    } else {
      this.datepicker.clear();
    }
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