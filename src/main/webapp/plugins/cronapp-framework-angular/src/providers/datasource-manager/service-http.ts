import { RequestOptions, Headers, Http } from "@angular/http";
import { HelperServiceProvider } from "../helper-service/helper-service";
import { RequestArgs } from "../helper-service/request-args";
import { resolvablesBuilder } from "@uirouter/core";

export class ServiceHttp {

    window: any;

    constructor(private http: Http, private dataset: any, private helpserService: HelperServiceProvider) {
        this.window = (window as any);
    }

    save(object: any) {
        return this.call(this.dataset.entity, "POST", object, true);
    }

    update(url: string, object: any) {
        return this.call(url, "PUT", object, false);
    }

    remove(url: string) {
        return this.call(url, "DELETE", null, true);
    }

    call(url: string, verb: string, obj: any, applyScope: boolean) {
        var object:any = {};
        var isCronapiQuery = (url.indexOf('/cronapi/query/') >= 0);

        if (isCronapiQuery) {
            object.inputs = [obj];

            var fields:any = {};

            var _callback;
            this.dataset.busy = true;
            url = url.replace('/specificSearch', '');
            url = url.replace('/generalSearch', '');

            if (this && this.dataset.scope && this.dataset.scope.vars) {
                fields["vars"] = {};
                for (var attr in this.dataset.scope.vars) {
                    fields.vars[attr] = this.dataset.scope.vars[attr];
                }
            }

            for (var key in this.dataset.scope) {
                if (this.dataset.scope[key] && this.dataset.scope[key].constructor && this.dataset.scope[key].constructor.name == "DataSet") {
                    fields[key] = {};
                    fields[key].active = this.dataset.scope[key].active;
                }
            }

            object.fields = fields;
        } else {
            object = obj;
        }

        let promise = this.helpserService.promiseHttp(new RequestArgs(verb, url, object, this.dataset.headers),
        (res: any, resolve: any) => {
            this.dataset.busy = false;
            var data = null;
            if (res._body && res._body.length > 0)
                data = res.json()
            resolve(isCronapiQuery ? data.value : data);
            
            if (isCronapiQuery) {
                this.dataset.scope.cronapi.evalInContext(JSON.stringify(data));
            }                            
           
        },
        (error: any, reject: any) => {
            this.dataset.busy = false;
            var data = error.json();
            this.dataset.handleError(isCronapiQuery && data.value ? data.value : data);
            reject(data);
        });

        return promise;
    }

}