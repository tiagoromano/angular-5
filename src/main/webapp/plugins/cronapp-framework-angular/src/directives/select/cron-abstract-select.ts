import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core'

import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

declare var kendo: any;

export abstract class CronAbstractSelect extends CrontrolValueAccessorBase<any> implements OnInit {
 
  protected oldData: any;

  private combobox: any;

  @ViewChild('currentInput') currentInput: ElementRef;

  @Input('multiple') public multiple: boolean;

  @Input('placeholder') public placeholder: string;

  @Input('textField') public textField: string;

  @Input('valueField') public valueField: string;

  @Input('class') public clazz: string;

  @Input('style') public style: string;

  @Input('data') public data: any;

  @Input('valuePrimitive') public valuePrimitive: boolean;

  constructor(protected element: ElementRef) {
    super();
  }

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
    const $element = $(this.currentInput.nativeElement);    
    const _self = this;
    
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
        _self.onChange(this.dataItems());
      }
      
      this.combobox = $element.kendoMultiSelect(object).data("kendoMultiSelect");
    } else {
      object['change'] =  function(e) {
        if (_self.valuePrimitive && this.dataItem(this.select())) {
          if (this.dataItem(this.select())[_self.valueField]) {
            _self.onChange(this.dataItem(this.select())[_self.valueField]);
          }
        } else {
          _self.onChange(this.dataItem(this.select()));
        }
      }

      this.combobox = $element.kendoComboBox(object).data("kendoComboBox");
    }

    setInterval(() => {
      if (this.oldData != this.data) {
        this.oldData = this.data;
        this.combobox.dataSource.data = this.data;        
        this.combobox.dataSource.query();
      }
    }, 300);
  }

  writeAdapterValue(oldValue: any, currentValue: any) {
    if ((this.valuePrimitive && currentValue !== oldValue) || 
        (!this.valuePrimitive && super.serializable(oldValue) !== super.serializable(currentValue))) {
      this.innerValue = currentValue ? currentValue : null;
      
      if (this.multiple) {
        if (Array.isArray(currentValue)) {
          let items = [];
          
          currentValue.forEach(element => {
            if (element[this.valueField]) {
              items.push(element[this.valueField]);  
            }
          });

          this.combobox.value(items);  
        }
      } else if (this.valuePrimitive) {
        this.combobox.value(currentValue ? currentValue : null);
      } else if (currentValue && currentValue[this.valueField]) {
        this.combobox.value(currentValue ? currentValue[this.valueField] : null);
      }
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

}
