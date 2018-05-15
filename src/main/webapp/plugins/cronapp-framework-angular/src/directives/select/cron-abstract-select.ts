import {
  Component,
  OnInit,
  ElementRef,
  Input
} from '@angular/core'

import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

export abstract class CronAbstractSelect extends CrontrolValueAccessorBase<any> implements OnInit {

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
    const $element = $(this.element.nativeElement);
    const dataSet = this.buildCronDataSource(this.element);

    if (dataSet && dataSet.data && dataSet.data.slice) {
      this.dataSource = dataSet.data.slice();
      this.data = dataSet.data;
    } else if (dataSet && dataSet.slice) {
      this.dataSource = dataSet.slice();
      this.data = dataSet;
    }

    this.switchDropDowns(this.element);
    this.setStyleAndClasses(this.element);
  }

  handleFilter(value): void {
    if (this.dataSource) {
      this.data = this.dataSource.filter((item) => item.value.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
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
