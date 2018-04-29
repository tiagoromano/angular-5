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
  useExisting: forwardRef(() => CronSelectComponent),
  multi: true
};

@Component({
  selector: 'cron-select',
  templateUrl: './cron-select.component.html',
  providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR],
})
export class CronSelectComponent extends CronAbstractSelect {
  
  constructor(protected element: ElementRef) {
    super(element);
  }

}