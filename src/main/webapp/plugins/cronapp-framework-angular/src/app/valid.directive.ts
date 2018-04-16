import { 
  Directive, 
  ElementRef,
  Renderer, 
  Input, 
  OnInit 
} from '@angular/core';

import {
  NG_VALIDATORS,
  FormsModule,
  FormControl,
  Validator,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

@Directive({
  selector: '[valid][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: ValidDirective, 
      multi: true 
    }
  ]
})
export class ValidDirective implements OnInit, Validator {

  @Input('valid') value: string;

  validator: ValidatorFn;

  dataErrorMessage: string = null;

  constructor(private element: ElementRef, private renderer: Renderer) {
    this.validator = this.cpfCnpjValidator(); 
  }

  ngOnInit() {
    debugger;
    var attrMessage = this.element.nativeElement.attributes["data-error-message"];
    if ((attrMessage != undefined) && (attrMessage != null)) {
      this.dataErrorMessage = attrMessage.value;
    }
  }

  validate(c: FormControl) {  
    debugger;
    return this.validator(c);  
  }
  
  cpfCnpjValidator(): ValidatorFn {  
    return (c: FormControl) => {  
      debugger;
      let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);  
      this.element.nativeElement.setCustomValidity("");
      if (isValid) {  
        return null;  
      } else {  
        this.element.nativeElement.setCustomValidity("CNPJ INVALIDO");
        return {  
          valid: {  
            valid: false,
            message: "CNPJ INVALIDO"  
          }  
        };  
      }  
    }  
  }  
}



