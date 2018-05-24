import { OnInit, ElementRef } from '@angular/core';
import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

declare var kendo: any;

export abstract class AbstractQrCode extends CrontrolValueAccessorBase<string> implements OnInit {  

    private errorCorrection: string;
    
    private size: string;
    
    private color: string;
    
    private background: string;
        
    constructor(protected element: ElementRef) {
        super();
    }

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

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value ? value : null;
            this.renderize();
        }
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

}