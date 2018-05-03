import {
  Component,
  OnInit,
  ElementRef,
  Input
} from '@angular/core'

import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

export abstract class CronAbstractSelect extends CrontrolValueAccessorBase<any> implements OnInit {

  protected selectedItem: any;

  protected fixedItems : boolean;

  protected dataSource: any;
  
  @Input('multiple') public multiple: boolean;

  @Input('placeholder') public placeholder: string;

  @Input('textField') public textField: string;

  @Input('valueField') public valueField: string;

  @Input('class') public clazz: string;

  @Input('style') public style: string;

  @Input('data') public data: any;

  constructor(protected element: ElementRef) {
    super();
  }

  ngOnInit() {
    debugger;
    const $element = $(this.element.nativeElement);
    this.data = this.buildCronDataSource(this.element);

    if (this.data != null) {
      this.dataSource = this.data.slice();
    }

    this.switchDropDowns(this.element);
    this.setStyleAndClasses(this.element);
  }

  handleFilter(value): void {
    this.data = this.dataSource.filter((item) => item.value.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  handleChangeItem(value): void {
    this.value = value;
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
