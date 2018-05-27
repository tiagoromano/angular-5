import { OnInit, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

declare var $: any;

declare var kendo: any;

export abstract class AbstractQrCode implements OnInit, ControlValueAccessor {  

    private errorCorrection: string;
    
    private size: string;
    
    private color: string;
    
    private background: string;
    
    protected innerValue: any;

    constructor(protected element: ElementRef) {}

    ngOnInit() {        
        this.errorCorrection = this.element.nativeElement.getAttribute('errorCorrection');
        this.size = this.element.nativeElement.getAttribute('size');
        this.color = this.element.nativeElement.getAttribute('color');
        this.background = this.element.nativeElement.getAttribute('background');

        this.errorCorrection = this.errorCorrection || 'M';
        this.size = this.size || '120';
        this.color = this.color || '#000000';
        this.background = this.background || 'transparent';

        this.renderize();
    }

    renderize() {
        const $element = $(this.element.nativeElement);
        $element.empty();
        if (this.value) {
            $element.kendoQRCode({
                value: this.value,
                errorCorrection: this.errorCorrection,
                size: this.size,
                color: this.color
            });
        }
    }

    onChange = (value: any) => {};
    
    onTouched = () => {};
 
    get value(): any {    
        return this.innerValue;
    }

    set value(value: any) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.onChange(value);
        }
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.renderize();
        }
    }

    registerOnChange(fn: (_: any) => void): void {this.onChange = fn;}

    registerOnTouched(fn: () => void): void {this.onTouched = fn;}
}