import { OnInit, Component } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Http } from "@angular/http";
import { HelperServiceProvider } from "../../providers/helper-service/helper-service";
import { CommonVariableProvider } from "../../providers/common-variable/common-variable";
import { Router } from "@angular/router";

@Component({
    selector: 'import-class',
    template: ''
})
export abstract class ImportClass implements OnInit {
    
    constructor (translate: TranslateService, translateModule: TranslateModule, http: Http, helperService: HelperServiceProvider, 
                 commonVariable: CommonVariableProvider, router: Router) {
        this.initialize(translate, http, helperService, commonVariable, router);
    }

    abstract initialize(translate: TranslateService, http: Http, helperService: HelperServiceProvider, commonVariable: CommonVariableProvider, router: Router): void;
    
    ngOnInit(): void {
    }


}