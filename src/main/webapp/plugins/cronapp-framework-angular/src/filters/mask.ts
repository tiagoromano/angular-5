import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'mask',  
    pure: false  
})  
export class MaskPipe implements PipeTransform {  
    transform(value: string, mask: string): any {  
        let str = value + '';
        
        if (value) {
            
        }

        return str;  
    }  
}  
