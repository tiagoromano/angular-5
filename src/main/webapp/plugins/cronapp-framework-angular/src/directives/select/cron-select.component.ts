import { 
  ElementRef,
  forwardRef,
  Directive
} from '@angular/core'

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CronAbstractSelect } from './abstract-select';

const COMBOBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CronSelectComponent),
  multi: true
};

declare var $: any;

@Directive({
  selector: 'cron-select',
  providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR],
})
export class CronSelectComponent extends CronAbstractSelect {
  
  constructor(protected element: ElementRef) {
    super(element);
  }

}