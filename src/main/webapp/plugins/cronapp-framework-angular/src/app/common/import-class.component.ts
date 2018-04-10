import { OnInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Http } from "@angular/http";
import { HelperServiceProvider } from "../../providers/helper-service/helper-service";
import { CommonVariableProvider } from "../../providers/common-variable/common-variable";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { StateService } from "@uirouter/core";

@Component({
    selector: 'import-class',
    template: ''
})
export abstract class ImportClass implements OnInit {
    
    @ViewChild('vc', {read: ViewContainerRef}) vc;


    constructor (translate: TranslateService, translateModule: TranslateModule, http: Http, helperService: HelperServiceProvider, 
                 commonVariable: CommonVariableProvider,/* router: Router, activatedRoute: ActivatedRoute,*/ httpService: HttpClient,
                 stateService: StateService) {
        this.initialize(translate, translateModule, http, helperService, commonVariable,/* router, activatedRoute,*/ httpService, stateService);
    }

    abstract initialize(translate: TranslateService, translateModule: TranslateModule, http: Http, helperService: HelperServiceProvider, 
                        commonVariable: CommonVariableProvider,/* router: Router, activatedRoute: ActivatedRoute,*/ httpService: HttpClient,
                        stateService: StateService): void;
    
    ngOnInit(): void {
    }


}