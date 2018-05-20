import { OnInit, ElementRef } from '@angular/core';
import { CrontrolValueAccessorBase } from '../util/crontrol-value-acessor-base';

declare var $: any;

declare var kendo: any;

export abstract class AbstractQrCode extends CrontrolValueAccessorBase<string> implements OnInit {  

    private errorCorrection: string;
    
    private size: string;
    
    private color: string;
    
    private background: string;
    
    private oldValue: String;
    
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

        setInterval(() => {
            if (this.value != this.oldValue) {
                this.renderize(); 
                this.oldValue = this.value;
            }
        }, 300);
    }

    renderize() {
        if (this.value) {
            const $element = $(this.element.nativeElement);
            $element.empty();
            const qrCode = $element.kendoQRCode({
                value: this.value,
                errorCorrection: this.errorCorrection,
                size: this.size,
                color: this.color
            });
        }
    }

}