import { RequestOptions, Headers, Http } from "@angular/http";

export class ServiceHttp {

    window: any;

    constructor(private http: Http, private dataset: any) {
        debugger;
        this.window = (window as any);
    }

    save(object: any) {
        debugger;
        return this.call(this.dataset.entity, "POST", object, true);
    }

    update(url: string, object: any) {
        debugger;
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

        // // Get an ajax promise
        // this.$promise = $http({
        //     method: verb,
        //     url: (window.hostApp || "") + url,
        //     data: (object) ? JSON.stringify(object) : null,
        //     headers: _self.headers
        // }).success(function(data, status, headers, config) {
        //     this.busy = false;
        //     if (_callback) _callback(isCronapiQuery?data.value:data);
        //     if (isCronapiQuery) {
        //         _self.$scope.cronapi.evalInContext(JSON.stringify(data));
        //     }
        // }).error(function(data, status, headers, config) {
        //     this.busy = false;
        //     _self.handleError(isCronapiQuery&&data.value?data.value:data);
        // });
       
        // this.$promise.then = function(callback) {
        //     _callback = callback;
        // }

        let promise = new Promise((resolve, reject) => {
            debugger;

            let httpInstance: any = null;
            if (verb == "POST")
                httpInstance = this.http.post((this.window.hostApp || "") + url, (object) ? JSON.stringify(object): null , this.dataset.headers);
            else if (verb == "PUT")
                httpInstance = this.http.put((this.window.hostApp || "") + url, (object) ? JSON.stringify(object): null , this.dataset.headers);
            else if (verb == "DELETE")
                httpInstance = this.http.delete((this.window.hostApp || "") + url, this.dataset.headers);
            
            httpInstance
            .toPromise()
            .then(
                res => {        
                    debugger;
                    this.dataset.busy = false;
                    var data = res.json()
                    if (_callback) _callback(isCronapiQuery ? data.value : data);
                    // if (isCronapiQuery) {
                    //     _self.$scope.cronapi.evalInContext(JSON.stringify(data));
                    // }                            
                    resolve(res.json());
                },
                error => {   
                    debugger;     
                    this.dataset.busy = false;
                    var data = error.json();
                    this.dataset.handleError(isCronapiQuery && data.value ? data.value : data);
                    resolve(error.json());
                }
            );
            
            // this.http.get(resourceURL +'?' + this.helperService.parseJsonToUrlParameters(props.params) , requestOptions)
            // .toPromise()
            // .then(
            //   res => { 
            //     debugger;
            //     this.busy = false;
            //     this.sucessHandlerFetch(res.json(), res.headers["_headers"], callbacks, isNextOrPrev);
            //     resolve();
            //   },
            //   error => {
            //     debugger;
            //     this.busy = false;
            //     this.handleError(error);
            //     if (callbacks.error) callbacks.error.call(this, error);
            //     reject(error);
            //   }
            // );
        });

        return promise;
    }


    // this.service = {
    //     save: function(object) {
    //         debugger;
    //         return this.call(this.entity, "POST", object, true);
    //     },
    //     update: function(url, object) {
    //         debugger;
    //         return this.call(url, "PUT", object, false);
    //     },
    //     remove: function(url) {
    //         return this.call(url, "DELETE", null, true);
    //     },
    //     call: function(url, verb, obj, applyScope) {
    //         var object:any = {};
    //         var isCronapiQuery = (url.indexOf('/cronapi/query/') >= 0);

    //         if (isCronapiQuery) {
    //             object.inputs = [obj];

    //             var fields:any = {};

    //             var _callback;
    //             this.busy = true;
    //             url = url.replace('/specificSearch', '');
    //             url = url.replace('/generalSearch', '');

    //             if (this && this.scope && this.scope.vars) {
    //                 fields["vars"] = {};
    //                 for (var attr in this.scope.vars) {
    //                     fields.vars[attr] = this.scope.vars[attr];
    //                 }
    //             }

    //             for (var key in this.scope) {
    //                 if (this.scope[key] && this.scope[key].constructor && this.scope[key].constructor.name == "DataSet") {
    //                 fields[key] = {};
    //                 fields[key].active = this.scope[key].active;
    //                 }
    //             }

    //             object.fields = fields;
    //         } else {
    //             object = obj;
    //         }

    //         // // Get an ajax promise
    //         // this.$promise = $http({
    //         //     method: verb,
    //         //     url: (window.hostApp || "") + url,
    //         //     data: (object) ? JSON.stringify(object) : null,
    //         //     headers: _self.headers
    //         // }).success(function(data, status, headers, config) {
    //         //     this.busy = false;
    //         //     if (_callback) _callback(isCronapiQuery?data.value:data);
    //         //     if (isCronapiQuery) {
    //         //         _self.$scope.cronapi.evalInContext(JSON.stringify(data));
    //         //     }
    //         // }).error(function(data, status, headers, config) {
    //         //     this.busy = false;
    //         //     _self.handleError(isCronapiQuery&&data.value?data.value:data);
    //         // });
           
    //         // this.$promise.then = function(callback) {
    //         //     _callback = callback;
    //         // }

    //         let promise = new Promise((resolve, reject) => {
    //             debugger;

    //             var requestOptions = new RequestOptions({
    //                 headers: new Headers({
    //                     'Content-Type':  'application/json',
    //                 })
    //             });

    //             var teste = this.headers;

    //             let httpInstance: any = null;
    //             if (verb == "POST")
    //                 httpInstance = this.http.post((this.window.hostApp || "") + url, (object) ? JSON.stringify(object): null , requestOptions);
    //             else if (verb == "PUT")
    //                 httpInstance = this.http.put((this.window.hostApp || "") + url, (object) ? JSON.stringify(object): null , requestOptions);
                
    //             httpInstance
    //             .toPromise()
    //             .then(
    //                 res => {        
    //                     debugger;
    //                     this.busy = false;
    //                     var data = res.json()
    //                     if (_callback) _callback(this.isCronapiQuery?data.value:data);
    //                     // if (isCronapiQuery) {
    //                     //     _self.$scope.cronapi.evalInContext(JSON.stringify(data));
    //                     // }                            
    //                     resolve(res.json());
    //                 },
    //                 error => {   
    //                     debugger;     
    //                     this.busy = false;
    //                     var data = error.json();
    //                     this.handleError(isCronapiQuery && data.value ? data.value : data);
    //                     resolve(error.json());
    //                 }
    //             );
                
    //             // this.http.get(resourceURL +'?' + this.helperService.parseJsonToUrlParameters(props.params) , requestOptions)
    //             // .toPromise()
    //             // .then(
    //             //   res => { 
    //             //     debugger;
    //             //     this.busy = false;
    //             //     this.sucessHandlerFetch(res.json(), res.headers["_headers"], callbacks, isNextOrPrev);
    //             //     resolve();
    //             //   },
    //             //   error => {
    //             //     debugger;
    //             //     this.busy = false;
    //             //     this.handleError(error);
    //             //     if (callbacks.error) callbacks.error.call(this, error);
    //             //     reject(error);
    //             //   }
    //             // );
    //         });

    //         return promise;
    //     }
    // }


}