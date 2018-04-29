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
import { CronAbstractSelect } from './cron-abstract-select';

const COMBOBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSelectComponent),
  multi: true
};

@Component({
  selector: 'ui-select',
  templateUrl: './cron-select.component.html',
  providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR],

})
export class UiSelectComponent extends CronAbstractSelect implements OnInit {
  
  constructor(protected element: ElementRef) {
    super(element);
  }

  ngOnInit() { 
    super.ngOnInit();
    let $element = $(this.element.nativeElement);   
    this.extractPlaceholder($element);
    this.extractTextAndValueField($element);
  }

  extractPlaceholder($element): void {
    const selectMatch = $element.find('ui-select-match');

    if (selectMatch != null && this.placeholder == null) {
      this.placeholder = $(selectMatch).attr('placeholder');
      selectMatch.remove();
    } 
  }

  extractTextAndValueField($element) {
    debugger;
    let selectChoices = $element.find('ui-select-choices');

    if (selectChoices != null) {
      const value = selectChoices.text();
      
      let field = null;
      if (value) {
        field = value.trim().split('.');
      }

      if (Array.isArray(field)) { 
        this.textField = field[field.length - 1];
      }

      let repeatAttr = selectChoices.attr('repeat');
      if (repeatAttr != null) {
        const expression = repeatAttr.trim().split('.');
        let findRowData = false;
        this.valueField = null;
        expression.forEach((element) => {
          if (findRowData) {
            if (this.valueField == null) {
              let subExpression = element.trim().split(' ');
              if (subExpression.length > 0) {
                this.valueField = subExpression[0];
              }
            }
            findRowData=false;
          } else if (element.trim().toLowerCase() == 'rowdata') {
            findRowData=true;
          }
        });
      }

      if (this.valueField == null && this.fixedItems) {
        this.valueField = 'key';
      }

      selectChoices.remove();
    }    
  }
  
}