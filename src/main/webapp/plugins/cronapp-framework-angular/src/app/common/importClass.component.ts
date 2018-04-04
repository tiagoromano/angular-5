import { OnInit, Component } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
    selector: 'import-class',
    template: ''
})
export abstract class ImportClass implements OnInit {
    
    // translate: TranslateService;

    constructor (translate: TranslateService, translateModule: TranslateModule ) {
        debugger;
        this.initialize(translate);
    }

    abstract initialize(translate: TranslateService): void;
    // initialize(translate: TranslateService) {
    // }

    
    ngOnInit(): void {
    }


}