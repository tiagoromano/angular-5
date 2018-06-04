import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'tel',  
    pure: false  
})  
export class TelephonePipe implements PipeTransform {  
    transform(value: string): any {  
        let str = value + '';
        
        if (value) {
            str = str.replace(/\D/g, '');
            if (str.length === 11) {
                str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
                str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
        }

        return str;  
    }  
}  
