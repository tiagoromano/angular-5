import { Directive, Input, ElementRef, forwardRef } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var $: any;

@Directive({
  selector: 'ui-select[ngModel]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => UiSelectDirective), 
    multi: true
  }]
})
export class UiSelectDirective implements ControlValueAccessor {
// export class UiSelectDirective {

  private data : any;

  private newInput : any;

  @Input('value') _value;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    private element: ElementRef
  ) {}
  
  ngOnInit(): void {
    const datasource = this.element.nativeElement.getAttribute('crn-datasource');
    // let data = null;
    // if (datasource != null) {
    //   datasource.replace(/'/g, "\"");
    //   const data = JSON.parse(datasource);
    // }

    let $element = $(this.element.nativeElement);
    
    this.data = [
      { value: 'Black', key: '1' },
      { value: 'Orange', key: '2' },
      { value: 'Grey', key: '3' }
    ];

    const selectMatch = $element.find('ui-select-match');
    const descPlaceholder = $(selectMatch).attr('placeholder');

    const selectChoices = $element.find("ui-select-choices");
    const repeatCmd = $(selectChoices).attr('repeat');
    
    //TO-DO: todo remover class/style $element e adicionar em newInput 

    this.newInput = $($element).append(function() {
      return '<input id="fabric" placeholder="Select fabric..." style="width: 100%;" />';
    });
  
    this.newInput = $element.find('input');

    $(this.newInput).kendoDropDownList({
      filter: "contains",
      placeholder: descPlaceholder,
      dataTextField: "value",
      dataValueField: "key",
      dataSource: this.data,
      select : this.onSelect.bind(this)
    });
    
  }

  onSelect(e) {
    debugger;
    if (e.item) {
      var dataItem = e.sender.dataItem(e.item.index());
      this.value(dataItem);
    } else {
      alert("event :: select");
    }
  };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { 
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }
}
