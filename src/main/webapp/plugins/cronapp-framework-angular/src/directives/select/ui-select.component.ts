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
import { UiSelectMatchComponent } from './ui-select-match.component';

declare var $: any;

const COMBOBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSelectComponent),
  multi: true
};

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR],

})
export class UiSelectComponent extends CrontrolValueAccessorBase<any> implements OnInit {

  private items: any;

  private dataSource: any;

  private selectedItem: any;
  
  @Input() public multiple: boolean;
  
  @Input() public placeholder: string;

  @Input() public textField: string;
  
  @Input() public valueField: string;
  
  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() { 
    debugger;
    let $element = $(this.element.nativeElement);   
    this.items = this.buildCronDataSource(this.element);
    if (this.items != null) {
      this.dataSource = this.items.slice();
    }
    this.switchDropDowns(this.element);
    this.extractValueAndPlaceholder($element);
    this.extractValue($element);
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
      var newCrnDatasource = crnDatasource.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      newCrnDatasource = newCrnDatasource.replace(/'/g, '"');
      return JSON.parse(newCrnDatasource);
    } else {
      return null;
    }
  }

  extractValueAndPlaceholder($element): void {
    const selectMatch = $element.find('ui-select-match');

    if (selectMatch != null) {
      this.placeholder = $(selectMatch).attr('placeholder');
      const val = selectMatch.text();
      selectMatch.remove();
    } 
  }

  extractValue($element) {
    const selectChoices = $element.find('ui-select-choices');

    if (selectChoices != null) {
      const val = selectChoices.text();
      selectChoices.remove();
    }    
  }
}