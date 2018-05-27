import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor } from '@angular/forms';

declare var $: any;

declare var kendo: any;

export abstract class CronAbstractSelect implements OnInit, ControlValueAccessor {
 
  protected multiple: boolean;

  protected placeholder: string;

  protected textField: string;

  protected valueField: string;

  protected clazz: string;

  protected style: string;

  protected data: any;

  protected valuePrimitive: boolean;

  protected oldValue: any;
  
  protected oldData: any;

  protected combobox: any;
  
  protected innerValue: any;
  
  constructor(protected element: ElementRef) {}

  ngOnInit() {
    const $element = $(this.element.nativeElement);
    const formDataSource = this.buildCronDataSource(this.element);

    this.valuePrimitive = !(formDataSource && formDataSource.data && formDataSource.data.slice);
    if (formDataSource && formDataSource.data && formDataSource.data.slice) {
      this.data = formDataSource.data;
    } else if (formDataSource && formDataSource.slice) {
      this.data = formDataSource;
    }
    
    this.switchDropDowns(this.element);
    this.setStyleAndClasses(this.element);
    this.resizeComboBox(); 
  }

  resizeComboBox() {
    let _self = this;
    setInterval(() => {
      if (_self.oldData != _self.data) {
        _self.oldData = _self.data;
        _self.combobox.dataSource.data = _self.data;        
        _self.combobox.dataSource.query();
      }
      _self.writeValue(_self.value);
    }, 100);

    const $element = $(this.element.nativeElement);    
    const select = this;
    
    let object = {
      dataTextField: this.textField,
      dataValueField: this.valueField,
      dataSource: this.data,
      placeholder: this.placeholder,
      valuePrimitive: this.valuePrimitive,
      filter: 'contains'
    }

    if (this.multiple) {
      object['change'] =  function(e) {
        select.onChange(this.dataItems());
      }

      this.combobox = $element.kendoMultiSelect(object).data("kendoMultiSelect");
    } else {
      object['change'] =  function(e) {
        if (select.valuePrimitive && this.dataItem(this.select())) {
          if (this.dataItem(this.select())[select.valueField]) {
            select.onChange(this.dataItem(this.select())[select.valueField]);
          }
        } else {
          select.onChange(this.dataItem(this.select()));
        }
      }

      this.combobox = $element.kendoComboBox(object).data("kendoComboBox");
    }
  }

  setStyleAndClasses(element) {
    const clazz = element.nativeElement.getAttribute('class');
    if (clazz) {
      this.clazz = clazz;
    }
  }

  switchDropDowns(element): void {
    this.multiple = false;
    const multiselect = element.nativeElement.getAttribute('multiple');
    if (multiselect != undefined && this.multiple != null){
      this.multiple = true;
    }
  }

  buildCronDataSource(element): any {
    const crnDatasource = element.nativeElement.getAttribute('crn-datasource');

    if (crnDatasource != null) {
      return eval(crnDatasource);
    } else {
      return null;
    }
  }

  onChange = (_: any) => {};

  onTouched = () => {};
 
  get value(): any {    
    return this.innerValue;
  }

  clone(object: any) {
    return this.deserializable(this.serializable(object));
  }

  serializable(object: any) {
    if (!object || (object !== Object(object))) {
      return object;
    } else {
      return JSON.stringify(object);
    }
  }

  deserializable(json: any) {
    if (json && (typeof json === 'string')) {
      return JSON.parse(json);
    } else {
      return json;
    }
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;  
      this.onChange(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      if (this.multiple) {
        this.innerValue = this.serializable(value);
      } else {
        this.innerValue = value;  
      }

      if (this.multiple) {
        if (Array.isArray(value)) {
          let items = [];
          
          value.forEach(element => {
            if (element[this.valueField]) {
              items.push(element[this.valueField]);  
            }
          });

          this.combobox.value(items);  
        }
      } else if (this.valuePrimitive) {
        this.combobox.value(value ? value : null);
      } else if (value && value[this.valueField]) {
        this.combobox.value(value ? value[this.valueField] : null);
      }
    }
  }

  registerOnChange(fn: (_: any) => void): void {this.onChange = fn;}

  registerOnTouched(fn: () => void): void {this.onTouched = fn;}

}
