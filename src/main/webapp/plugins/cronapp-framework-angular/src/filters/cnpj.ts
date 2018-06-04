import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'cnpj',  
    pure: false  
})  
export class CnpjPipe implements PipeTransform {  
    transform(value: string): any {  
        let str = value + '';
        
        if (value) {
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d)/, '$1.$2');
            str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
            str = str.replace(/(\d{4})(\d)/, '$1-$2'); 
        }
        
        return str;  
    }  
}  

