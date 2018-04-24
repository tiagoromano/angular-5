import { OnInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Http } from "@angular/http";
// import { HelperServiceProvider } from "../../providers/helper-service/helper-service";
// import { CommonVariableProvider } from "../../providers/common-variable/common-variable";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { StateService } from "@uirouter/core";
import { NotificationsService } from "angular2-notifications";
import { HelperServiceProvider } from "../providers/helper-service/helper-service";
import { CommonVariableProvider } from "../providers/common-variable/common-variable";

@Component({
    selector: 'import-class',
    template: ''
})
export abstract class BaseComponent implements OnInit {
    
    @ViewChild('vc', {read: ViewContainerRef}) vc;

    protected vars: any;
    protected cronapi: any;
    protected window = (window as any);



    constructor (   
        protected translate: TranslateService, protected translateModule: TranslateModule, protected http: Http, 
        protected helperService: HelperServiceProvider, protected commonVariable: CommonVariableProvider, 
        protected httpService: HttpClient, protected stateService: StateService, protected notificationsService: NotificationsService
    ) {
        
        this.cronapi = this.window.cronapi || {};
        this.cronapi.$scope = this;
        this.vars = {};

        this.initialize();
    }

    abstract initialize(): void;
                        
    
    ngOnInit(): void {
    }


}