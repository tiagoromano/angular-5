import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { CommonVariableProvider } from '../../providers/common-variable/common-variable';
import { CronappSecurity } from './cronapp-security';

@Directive({
  selector: '[cronapp-security]'
})
export class CronappSecurityDirective  { 

  @Input('cronapp-security') directiveValue: string;

  constructor(private element: ElementRef, 
              private renderer: Renderer,
              private common: CommonVariableProvider) { }
  
  ngOnInit() {
    new CronappSecurity().initSecurity(this.common, this.element, this.renderer, this.directiveValue);
  }

}
