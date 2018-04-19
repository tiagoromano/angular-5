import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { ngModuleJitUrl } from "@angular/compiler";
import { AppCustomModule } from "../../app/app.custom.module";
import { RequestArgs } from "./request-args";
import { Http } from "@angular/http";
import { CommonVariableProvider } from "../common-variable/common-variable";

@Injectable()
export class HelperServiceProvider {

    private window: any;
    private readonly verbGET: string = "GET";
    private readonly verbPOST: string = "POST";
    private readonly verbPUT: string = "PUT";
    private readonly verbDELETE: string = "DELETE";
    private readonly authToken: string = "X-AUTH-TOKEN";
    private readonly contentType: string = "content-type";
    private readonly applicationFormUrlEncoded = "application/x-www-form-urlencoded";
    private readonly applicationJson = "application/json"
    
    constructor( private translateService: TranslateService, private http: Http, private commonVariableProvider:CommonVariableProvider) {
        this.window = (window as any);
    }
   
    parseJsonToUrlParameters(json: any) {
        let parameters:string = "";
        if (json) {
            for (var attr in json) {
                parameters += attr + "=" + encodeURIComponent(json[attr]) + "&";
            }
        }
        return parameters;
    }

    private requestArgsAdapater(requestArgs: RequestArgs) {
        debugger;
        requestArgs.headers.headers.set(this.authToken, this.commonVariableProvider.getToken());

        if (requestArgs.method.toUpperCase() == this.verbGET)
            requestArgs.data = this.parseJsonToUrlParameters(requestArgs.data);
        else {
            if (requestArgs.data) {
                if (this.applicationFormUrlEncoded == requestArgs.headers.headers.get(this.contentType))
                    requestArgs.data =  this.parseJsonToUrlParameters(requestArgs.data);
                else
                    requestArgs.data =  JSON.stringify(requestArgs.data);
            }
            else
                requestArgs.data = null;
        }

        if (this.window.hostApp && requestArgs.url.indexOf(this.window.hostApp) == -1)
            requestArgs.url = this.window.hostApp + requestArgs.url;

        return requestArgs;
    }

    private httpServiceFactory(requestArgs: RequestArgs) {

        requestArgs = this.requestArgsAdapater(requestArgs);

        let httpInstance: any = null;
        if (requestArgs.method.toUpperCase() == this.verbPOST)
            httpInstance = this.http.post(requestArgs.url, requestArgs.data , requestArgs.headers);
        else if (requestArgs.method.toUpperCase() == this.verbPUT)
            httpInstance = this.http.put(requestArgs.url, requestArgs.data, requestArgs.headers);
        else if (requestArgs.method.toUpperCase() == this.verbDELETE)
            httpInstance = this.http.delete(requestArgs.url, requestArgs.headers);
        else
            httpInstance = this.http.get(requestArgs.url +'?' + requestArgs.data, requestArgs.headers)
        return httpInstance;
    }


    promiseHttp(requestArgs: RequestArgs, rawPromiseSuccess?: any, rawPromiseError?: any) {

        let promise = new Promise((resolve, reject) => {
            
            this.httpServiceFactory(requestArgs)
            .toPromise()
            .then(
                res => {        
                    if (rawPromiseSuccess)
                        rawPromiseSuccess(res, resolve); 
                    else { 
                        var data = null;
                        if (res._body && res._body.length > 0)
                            data = res.json()                                               
                        resolve(data);
                    }                                       
                },
                error => {   
                    if (rawPromiseError) 
                        rawPromiseError(error, reject);
                    else {
                        var data = error.json();
                        reject(data);
                    }     
                }
            );
            
        });

        return promise;

    }
}
