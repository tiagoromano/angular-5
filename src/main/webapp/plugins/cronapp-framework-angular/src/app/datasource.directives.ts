import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[datasource]'
})
export class MyNewDirectiveDirective {

    @Input() entity: string;
    
    constructor(private el: ElementRef) { 
        
    }

    @HostListener('mouseenter') onMouseEnter() {
        // this.highlight( || 'red');
        this.el.nativeElement.style.backgroundColor(this.entity);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.backgroundColor(null);
    }
}