import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { ngModuleJitUrl } from "@angular/compiler";
import { AppCustomModule } from "../../app/app.custom.module";

@Injectable()
export class HelperServiceProvider {
    
    constructor( private translateService: TranslateService) {
    }
   
    parseJsonToUrlParameters(json: any) {
        let parameters:string = "";
        for (var attr in json) {
            parameters += attr + "=" + json[attr] + "&";
        }
        return parameters;
    }
}
