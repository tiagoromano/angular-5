import { 
  Component, 
  OnInit,
  ElementRef,
  Input,
  forwardRef,
  ViewChild,
  ContentChild
} from '@angular/core'

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

export class CronAbstractSelect extends CrontrolValueAccessorBase<any> implements OnInit {

  protected items: any;

  protected dataSource: any;

  protected selectedItem: any;

  protected fixedItems : boolean;
  
  @Input() public multiple: boolean;
  
  @Input() public placeholder: string;

  @Input() public textField: string;
  
  @Input() public valueField: string;
  
  constructor(protected element: ElementRef) {
    super();
  }

  ngOnInit() { 
    let $element = $(this.element.nativeElement);   
    this.items = this.buildCronDataSource(this.element);
    if (this.items != null) {
      this.dataSource = this.items.slice();
    }
    this.switchDropDowns(this.element);
  }

  handleFilter(value): void {
    this.items = this.dataSource.filter((item) => item.value.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  handleChangeItem(value): void {
    this.value = value;
  }

  switchDropDowns(element): void {
    this.multiple = false;
    const multiselect = element.nativeElement.getAttribute('multiple');
    if (multiselect != undefined && this.multiple != null){
      this.multiple = true
    }
  }

  buildCronDataSource(element): any {
    const crnDatasource = element.nativeElement.getAttribute('crn-datasource');
    if (crnDatasource != null) { 
      this.fixedItems = (Array.isArray(crnDatasource.split(',')));
      let newCrnDatasource = crnDatasource;
      if (this.fixedItems) { 
        newCrnDatasource = crnDatasource.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        newCrnDatasource = newCrnDatasource.replace(/'/g, '"');
      }
      return JSON.parse(newCrnDatasource);
    } else {
      return null;
    }
  }

}