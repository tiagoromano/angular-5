import { Http, RequestOptions, Headers } from "@angular/http";
import { HelperServiceProvider } from "../helper-service/helper-service";
import { ServiceHttp } from "./service-http";
import { RequestArgs } from "../helper-service/request-args";
import { NotificationsService , SimpleNotificationsModule} from "angular2-notifications";
// import * as $ from 'jquery';

declare var $ :any;
export class DataSet {
 
    private searchTimeout: any;
    private dataWatchId: any;
    allowFetch: boolean;
    dependentLazyPostField: any;
    dependentLazyPost: any;
    dependentBy: any;
    onAfterDelete: any;
    onBeforeDelete: any;
    onAfterUpdate: any;
    onBeforeUpdate: any;
    onAfterCreate: any;
    onBeforeCreate: any;
    onAfterFill: any;
    offset: any;
    deleteMessage: string;
    autoPost: boolean;
    filterURL: any;
    prepend: boolean;
    apiVersion: any;
    // private readonly NO_IMAGE_UPLOAD = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiB2aWV3Qm94PSIwIDAgNDQuNTAyIDQ0LjUwMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQuNTAyIDQ0LjUwMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05Ljg2MiwzNS42MzhoMjQuNzc5YzAtNS41NDYtMy44NjMtMTAuMjAzLTkuMTEzLTExLjYwNGMyLjc1LTEuMjQ4LDQuNjY4LTQuMDEzLDQuNjY4LTcuMjI5ICAgIGMwLTQuMzg4LTMuNTU5LTcuOTQyLTcuOTQyLTcuOTQyYy00LjM4NywwLTcuOTQzLDMuNTU3LTcuOTQzLDcuOTQyYzAsMy4yMTksMS45MTYsNS45OCw0LjY2OCw3LjIyOSAgICBDMTMuNzI1LDI1LjQzNSw5Ljg2MiwzMC4wOTIsOS44NjIsMzUuNjM4eiIgZmlsbD0iIzkxOTE5MSIvPgoJCTxwYXRoIGQ9Ik0xLjUsMTQuMTY5YzAuODI4LDAsMS41LTAuNjcyLDEuNS0xLjVWNC4zMzNoOC4zMzZjMC44MjgsMCwxLjUtMC42NzIsMS41LTEuNWMwLTAuODI4LTAuNjcyLTEuNS0xLjUtMS41SDIuNzc1ICAgIEMxLjI0NCwxLjMzMywwLDIuNTc3LDAsNC4xMDh2OC41NjFDMCwxMy40OTcsMC42NywxNC4xNjksMS41LDE0LjE2OXoiIGZpbGw9IiM5MTkxOTEiLz4KCQk8cGF0aCBkPSJNNDEuNzI3LDEuMzMzaC04LjU2MmMtMC44MjcsMC0xLjUsMC42NzItMS41LDEuNWMwLDAuODI4LDAuNjczLDEuNSwxLjUsMS41aDguMzM2djguMzM2YzAsMC44MjgsMC42NzMsMS41LDEuNSwxLjUgICAgczEuNS0wLjY3MiwxLjUtMS41di04LjU2QzQ0LjUwMiwyLjU3OSw0My4yNTYsMS4zMzMsNDEuNzI3LDEuMzMzeiIgZmlsbD0iIzkxOTE5MSIvPgoJCTxwYXRoIGQ9Ik00My4wMDIsMzAuMzMzYy0wLjgyOCwwLTEuNSwwLjY3Mi0xLjUsMS41djguMzM2aC04LjMzNmMtMC44MjgsMC0xLjUsMC42NzItMS41LDEuNXMwLjY3MiwxLjUsMS41LDEuNWg4LjU2ICAgIGMxLjUzLDAsMi43NzYtMS4yNDYsMi43NzYtMi43NzZ2LTguNTZDNDQuNTAyLDMxLjAwNSw0My44MywzMC4zMzMsNDMuMDAyLDMwLjMzM3oiIGZpbGw9IiM5MTkxOTEiLz4KCQk8cGF0aCBkPSJNMTEuMzM2LDQwLjE2OUgzdi04LjMzNmMwLTAuODI4LTAuNjcyLTEuNS0xLjUtMS41Yy0wLjgzLDAtMS41LDAuNjcyLTEuNSwxLjV2OC41NmMwLDEuNTMsMS4yNDQsMi43NzYsMi43NzUsMi43NzZoOC41NjEgICAgYzAuODI4LDAsMS41LTAuNjcyLDEuNS0xLjVTMTIuMTY1LDQwLjE2OSwxMS4zMzYsNDAuMTY5eiIgZmlsbD0iIzkxOTE5MSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
    // private readonly NO_FILE_UPLOAD = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjMyNiwyOTcuMzUyYy0xNS44OTYtMTkuODktMzYuMjEtMzIuNzgyLTYwLjk1OS0zOC42ODRjNy44MS0xMS44LDExLjcwNC0yNC45MzQsMTEuNzA0LTM5LjM5OSAgIGMwLTIwLjE3Ny03LjEzOS0zNy40MDEtMjEuNDA5LTUxLjY3OGMtMTQuMjczLTE0LjI3Mi0zMS40OTgtMjEuNDExLTUxLjY3NS0yMS40MTFjLTE4LjA4MywwLTMzLjg3OSw1LjkwMS00Ny4zOSwxNy43MDMgICBjLTExLjIyNS0yNy40MS0yOS4xNzEtNDkuMzkzLTUzLjgxNy02NS45NWMtMjQuNjQ2LTE2LjU2Mi01MS44MTgtMjQuODQyLTgxLjUxNC0yNC44NDJjLTQwLjM0OSwwLTc0LjgwMiwxNC4yNzktMTAzLjM1Myw0Mi44MyAgIGMtMjguNTUzLDI4LjU0NC00Mi44MjUsNjIuOTk5LTQyLjgyNSwxMDMuMzUxYzAsMi40NzQsMC4xOTEsNi41NjcsMC41NzEsMTIuMjc1Yy0yMi40NTksMTAuNDY5LTQwLjM0OSwyNi4xNzEtNTMuNjc2LDQ3LjEwNiAgIEM2LjY2MSwyOTkuNTk0LDAsMzIyLjQzLDAsMzQ3LjE3OWMwLDM1LjIxNCwxMi41MTcsNjUuMzI5LDM3LjU0NCw5MC4zNThjMjUuMDI4LDI1LjAzNyw1NS4xNSwzNy41NDgsOTAuMzYyLDM3LjU0OGgzMTAuNjM2ICAgYzMwLjI1OSwwLDU2LjA5Ni0xMC43MTEsNzcuNTEyLTMyLjEyYzIxLjQxMy0yMS40MDksMzIuMTIxLTQ3LjI0NiwzMi4xMjEtNzcuNTE2QzU0OC4xNzIsMzM5Ljk0NCw1NDAuMjIzLDMxNy4yNDgsNTI0LjMyNiwyOTcuMzUyICAgeiBNMzYyLjcyOSwyODkuNjQ4Yy0xLjgxMywxLjgwNC0zLjk0OSwyLjcwNy02LjQyLDIuNzA3aC02My45NTN2MTAwLjUwMmMwLDIuNDcxLTAuOTAzLDQuNjEzLTIuNzExLDYuNDIgICBjLTEuODEzLDEuODEzLTMuOTQ5LDIuNzExLTYuNDIsMi43MTFoLTU0LjgyNmMtMi40NzQsMC00LjYxNS0wLjg5Ny02LjQyMy0yLjcxMWMtMS44MDQtMS44MDctMi43MTItMy45NDktMi43MTItNi40MlYyOTIuMzU1ICAgSDE1NS4zMWMtMi42NjIsMC00Ljg1My0wLjg1NS02LjU2My0yLjU2M2MtMS43MTMtMS43MTQtMi41NjgtMy45MDQtMi41NjgtNi41NjZjMC0yLjI4NiwwLjk1LTQuNTcyLDIuODUyLTYuODU1bDEwMC4yMTMtMTAwLjIxICAgYzEuNzEzLTEuNzE0LDMuOTAzLTIuNTcsNi41NjctMi41N2MyLjY2NiwwLDQuODU2LDAuODU2LDYuNTY3LDIuNTdsMTAwLjQ5OSwxMDAuNDk1YzEuNzE0LDEuNzEyLDIuNTYyLDMuOTAxLDIuNTYyLDYuNTcxICAgQzM2NS40MzgsMjg1LjY5NiwzNjQuNTM1LDI4Ny44NDUsMzYyLjcyOSwyODkuNjQ4eiIgZmlsbD0iI2NlY2VjZSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
    watchFilter: any;
    
    active: any;
    lastActive: any;
    name: string;
    // Notification: any;
    scope: any;
    // noImageUpload: any;
    // noFileUpload : any;
    columns: any;
    data :any;
    keys :any;
    enabled :any;
    endpoint :any;
    inserting :boolean;
    onStartInserting: any;
    editing :boolean;
    fetchSize :any;
    observers :any;
    rowsPerPage :any;
    append :boolean;
    preppend: boolean;
    headers :RequestOptions;
    responseHeaders :any;
    _activeValues :any;
    errorMessage :any;
    onError :any;
    links :any;
    loadedFinish :any;
    lastFilterParsed :any;
    cursor :any;
    _savedProps;
    hasMoreResults :any;
    unregisterDataWatch :any;
    dependentBufferLazyPostData :any;
    lastAction :any;
    dependentData :any;
    window: any;
    defaultNotSpecifiedErrorMessage: string;
    entity: string;
    entityBase: string;
    rawHeaders: string;
    private busy :any;
    private loaded :any;
    private service: ServiceHttp;

    constructor(name: string, entity: string, scope: any, private http: Http, private helperService: HelperServiceProvider,
                private notificationsService: NotificationsService) {
        // TODO: Adicionar o Notification (Peojeto geral) -> o maximo parecido possivel do angular 1.6 - ui-notification
        this.active = {};
        this.name = name;
        this.entity = entity;
        this.entityBase = entity;

        this.watchFilter = null;
        // this.Notification = Notification;
        this.scope = scope;
        // this.noImageUpload = this.NO_IMAGE_UPLOAD;
        // this.noFileUpload = this.NO_FILE_UPLOAD;
        this.columns = [];
        this.data = [];
        this.keys = [];
        this.enabled = true;
        this.endpoint = null;
        this.inserting = false;
        this.editing = false;
        this.fetchSize = 2;
        this.observers = [];
        this.rowsPerPage = null;
        this.append = true;
        
        this.responseHeaders = null;
        this._activeValues = null;
        this.errorMessage = "";
        this.onError = null;
        this.links = null;
        this.loadedFinish = null;
        this.lastFilterParsed = null;

        this.busy = false;
        this.cursor = 0;
        this._savedProps;
        this.hasMoreResults = false;
        this.loaded = false;
        this.unregisterDataWatch = null;
        this.dependentBufferLazyPostData = null;
        this.lastAction = null;
        this.dependentData = null;
        this.window = (window as any);
    }

    
    initialize() {
        var dsScope = this;
        // Get the service resource
        this.defineHeaders();
        this.service = new ServiceHttp(this.http, this, this.helperService);
        this.watchActive();
    }

    /**
     * Check if the datasource is waiting for any request response
     */
    isBusy() {
        return this.busy;
    }

    private defineHeaders(): any {
        var newHeader = new Headers({
            'Content-Type':  'application/json',
        });

        if (this.rawHeaders && this.rawHeaders.length > 0) {
            newHeader.set('X-From-DataSource', 'true');
            var splitedHeaders = this.rawHeaders.trim().split(";");
            splitedHeaders.forEach(nameValue => {
                var header = nameValue.split(":");
                newHeader.set(header[0], header[1]);
            });
        }

        this.headers = new RequestOptions({
            headers: newHeader
        });
    }

    private watchActive() {
        var active;
        var watch = setInterval(function() {
            if (!active)
                active = this.active;
            if (this.active != active) {
                active = this.active;
                if (active) {
                    this.notifyObservers();
                }
            }
        }.bind(this), 500);
    }

    /**
     * Check if the datasource was loaded by service
     */
    isLoaded() {
        return this.loaded;
    }

    toString () {
        return "[Datasource]"
    }

    handleAfterCallBack (callBackFunction) {
        if (callBackFunction) {
            try {
                var indexFunc = callBackFunction.indexOf('(') == -1 ? callBackFunction.length : callBackFunction.indexOf('(');
                var func = eval(callBackFunction.substring(0, indexFunc));
                var isFunc = typeof(func) === 'function';
                if (isFunc) func.call(this, this);
            } catch (e) {
                this.handleError(e);
            }
        }
    }

    handleBeforeCallBack (callBackFunction) {
        var isValid = true;
        if (callBackFunction) {
            try {
                var indexFunc = callBackFunction.indexOf('(') == -1 ? callBackFunction.length : callBackFunction.indexOf('(');
                var func = eval(callBackFunction.substring(0, indexFunc));
                var isFunc = typeof(func) === 'function';
                if (isFunc) func.call(this, this.active);   
            } catch (e) {
                isValid = false;
                this.handleError(e);
            }
        }
        return isValid;
    }

    /**
     * Error Handler function
     */
    handleError (data) {
        console.log(data);

        var error = "";

        if (data) {
            if (Object.prototype.toString.call(data) === "[object String]") {
                error = data;
            } else {
                var errorMsg = (data.msg || data.desc || data.message || data.error || data.responseText);
                if (errorMsg) {
                    error = errorMsg;
                }
            }
        }

        if (!error) {
            error = this.defaultNotSpecifiedErrorMessage;
        }

        var regex = /<h1>(.*)<\/h1>/gmi;
        var result = regex.exec(error);

        if (result && result.length >= 2) {
            error = result[1];
        }

        this.errorMessage = error;

        if (this.onError && this.onError != '') {
            if (typeof(this.onError) === 'string') {
                try {
                    var indexFunc = this.onError.indexOf('(') == -1 ? this.onError.length : this.onError.indexOf('(');
                    var func = eval(this.onError.substring(0, indexFunc));
                    if (typeof(func) === 'function') {
                        this.onError = func;
                    }
                } catch (e) {
                    // this.isValid = false;
                    this.notificationsService.error(e);
                }
            }
        } else {
            this.onError = function(error) {
                this.notificationsService.error(error);
            };
        }
        this.onError.call(this, error);
    }
    
    //     /**
    //      * Error Handler function
    //      */
    //     this.handleError = function(data) {
    //     console.log(data);

    //     var error = "";

    //     if (data) {
    //         if (Object.prototype.toString.call(data) === "[object String]") {
    //         error = data;
    //         } else {
    //         var errorMsg = (data.msg || data.desc || data.message || data.error || data.responseText);
    //         if (errorMsg) {
    //             error = errorMsg;
    //         }
    //         }
    //     }

    //     if (!error) {
    //         error = this.defaultNotSpecifiedErrorMessage;
    //     }

    //     var regex = /<h1>(.*)<\/h1>/gmi;
    //     result = regex.exec(error);

    //     if (result && result.length >= 2) {
    //         error = result[1];
    //     }

    //     this.errorMessage = error;

    //     if (this.onError && this.onError != '') {
    //         if (typeof(this.onError) === 'string') {
    //         try {
    //             var indexFunc = this.onError.indexOf('(') == -1 ? this.onError.length : this.onError.indexOf('(');
    //             var func = eval(this.onError.substring(0, indexFunc));
    //             if (typeof(func) === 'function') {
    //             this.onError = func;
    //             }
    //         } catch (e) {
    //             isValid = false;
    //             Notification.error(e);
    //         }
    //         }
    //     } else {
    //         this.onError = function(error) {
    //         Notification.error(error);
    //         };
    //     }

    //     this.onError.call(this, error);
    //     }

    //     // Start watching for changes in activeRow to notify observers
    //     if (this.observers && this.observers.length > 0) {
    //     $rootScope.$watch(function() {
    //         return this.active;
    //     }.bind(this), function(activeRow) {
    //         if (activeRow) {
    //         this.notifyObservers(activeRow);
    //         }
    //     }.bind(this), true);
    //     }
    // }

    // this.setFile = function($file, object, field) {
    //     if ($file && $file.$error === 'pattern') {
    //     return;
    //     }
    //     if ($file) {
    //     toBase64($file, function(base64Data) {
    //         this.$apply = function(value) {
    //         object[field] = value;
    //         scope.$apply(object);
    //         }.bind(scope);
    //         this.$apply(base64Data);
    //     });
    //     }
    // };

    // this.downloadFile = function(field, keys) {
    //     if (keys === undefined)
    //     return;
    //     var url = (window.hostApp || "") + this.entity + "/download/" + field;
    //     for (var index = 0; index < keys.length; index++) {
    //     url += "/" + keys[index];
    //     }
    //     var req = {
    //     url: url,
    //     method: 'GET',
    //     responseType: 'arraybuffer'
    //     };
    //     $http(req).then(function(result) {
    //     var blob = new Blob([result.data], {
    //         type: 'application/*'
    //     });
    //     $window.open(URL.createObjectURL(blob));
    //     });
    // };

    // function toBase64(file, cb) {
    //     var fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = function(e) {
    //     var base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
    //     cb(base64Data);
    //     };
    // }

    // this.openImage = function(data) {
    //     if (data.indexOf('https://') == -1 && data.indexOf('http://') == -1)  {
    //     var  value = 'data:image/png;base64,' + data;
    //     var w = $window.open("", '_blank', 'height=300,width=400');
    //     w.document.write('<img src="'+ value + '"/>');
    //     } else {
    //     $window.open(data, '_blank', 'height=300,width=400');
    //     }
    // };

    // this.byteSize = function(base64String) {
    //     if (!angular.isString(base64String)) {
    //     return '';
    //     }

    //     function endsWith(suffix, str) {
    //     return str.indexOf(suffix, str.length - suffix.length) !== -1;
    //     }

    //     function paddingSize(base64String) {
    //     if (endsWith('==', base64String)) {
    //         return 2;
    //     }
    //     if (endsWith('=', base64String)) {
    //         return 1;
    //     }
    //     return 0;
    //     }

    //     function size(base64String) {
    //     return base64String.length / 4 * 3 - paddingSize(base64String);
    //     }

    //     function formatAsBytes(size) {
    //     return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
    //     }

    //     return formatAsBytes(size(base64String));
    // };

    /**
     * Append a new value to the end of this dataset.
     */
    insert (obj, callback) {
        debugger;
        if (this.handleBeforeCallBack(this.onBeforeCreate)) {
        //Check if contains dependentBy, if contains, only store in data TRM
            if (this.dependentLazyPost && this.dependentLazyPostField && (eval(this.dependentLazyPost).inserting || eval(this.dependentLazyPost).editing)) {
                var random = Math.floor(Math.random() * 9999) + 1;
                obj.tempBufferId = random;

                if (callback)
                    callback(obj);

                if (!this.dependentBufferLazyPostData)
                    this.dependentBufferLazyPostData = [];

                this.dependentBufferLazyPostData.push(obj);
            } else {
                this.service.save(obj).then(callback);
            }
        }
    }

    /**
     * Append a datasource to be notify when has a post or cancel
     */
    addDependentData (obj) {
        if (!this.dependentData)
            this.dependentData = [];
        this.dependentData.push(obj);
    }

    storeAndResetDependentBuffer (action: string) {
        var thisContextDataSet = this;
       
        if (action == 'post' && this.dependentBufferLazyPostData) {

            var datasetReferenced = eval(this.dependentLazyPost);
            
            this.dependentBufferLazyPostData.forEach(bufferData => {
                bufferData[this.dependentLazyPostField] = datasetReferenced.active;
                if (this.entityBase.indexOf('//') > -1) {
                    var keyObj = datasetReferenced.getKeyValues(datasetReferenced.active);
                    var suffixPath = '';
                    for (var key in keyObj) {
                        if (keyObj.hasOwnProperty(key)) {
                            suffixPath += '/' + keyObj[key];
                        }
                    }
                    suffixPath += '/';
                    this.entity = this.entityBase.replace('//', suffixPath);
                }
                this.insert(bufferData, null);
            });
            this.busy = false;
            this.editing = false;
            this.inserting = false;
        } 
        else {
            var indexObj = 0;
            while (indexObj > -1) {
                indexObj = -1;
                for (var i = 0; i < thisContextDataSet.data.length; i++) {
                    if (thisContextDataSet.data[i].tempBufferId) {
                        indexObj = i;
                        break;
                    }
                }
                if (indexObj > -1)
                    thisContextDataSet.data.splice(indexObj, 1);
            }
        }
        thisContextDataSet.dependentBufferLazyPostData = null;
    }

    /**
     * Find object in list by tempBufferId
     */
    getIndexOfListTempBuffer (list, obj) {
        var indexObj = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].tempBufferId && obj.tempBufferId && list[i].tempBufferId == obj.tempBufferId) {
                indexObj = i;
                break;
            }
        }
        return indexObj;
    }

    /**
     * Uptade a value into this dataset by using the dataset key to compare the objects.
     */
    update  (obj, callback) {
        // Get the keys values
        var keyObj = this.getKeyValues(obj);
        if (this.dependentBufferLazyPostData && obj.tempBufferId) {
            var indexObj = this.getIndexOfListTempBuffer(this.dependentBufferLazyPostData, obj);

            if (indexObj > -1) {
                this.dependentBufferLazyPostData.splice(indexObj, 1);
                this.dependentBufferLazyPostData.push(obj);
                indexObj = this.getIndexOfListTempBuffer(this.data, obj);
                this.data.splice(indexObj, 1);
                this.data.splice(indexObj, 0, obj);
                return;
            }
        }

        var url = this.entity;
        var suffixPath = "";
        for (var key in keyObj) {
            if (keyObj.hasOwnProperty(key)) {
                suffixPath += "/" + keyObj[key];
            }
        }

        if (!this.dependentLazyPost)
            url = url + suffixPath;

        if (this.handleBeforeCallBack(this.onBeforeUpdate)) {
            this.service.update(url, obj).then(callback);
        }
    }

    /**
     * Valid if required field is valid
     */
    missingRequiredField () {
        return  $('[required][ng-model*="' + this.name + '."]').hasClass('ng-invalid-required') || 
                $('[required][ng-model*="' + this.name + '."]').hasClass('ng-invalid') ||
                $('[required][ng-model*="' + this.name + '."]').hasClass('ng-empty') ||
                $('[required][ngmodelname*="' + this.name + '."]').hasClass('ng-invalid-required') || 
                $('[required][ngmodelname*="' + this.name + '."]').hasClass('ng-invalid') ||
                $('[required][ngmodelname*="' + this.name + '."]').hasClass('ng-empty')
                ;
    }

    /**
     * Valid is other validations like email, date and so on
     */
    hasInvalidField () {
        return $('input[ng-model*="' + this.name + '."]:invalid').size() > 0  || 
               $('input[ngmodelname*="' + this.name + '."]:invalid').size() > 0;
    }

    /**
     * Insert or update based on the the datasource state
     */
    post () {

        if (this.missingRequiredField())
            return;

        if (this.hasInvalidField())
            return;

        this.lastAction = "post";

        this.busy = true;

        if (this.inserting) {
            // Make a new request to persist the new item
            this.insert(this.active, function(obj) {
                // In case of success add the new inserted value at
                // the end of the array
                this.data.push(obj);
                // The new object is now the active
                this.active = obj;
                this.handleAfterCallBack(this.onAfterCreate);
                this.onBackNomalState();
                this.notifyDependentDatasources('post');

            }.bind(this));
        } 
        else if (this.editing) {
        // Make a new request to update the modified item
            this.update(this.active, function(obj) {
                
                this.replaceItemInData(obj);
                this.onBackNomalState();
                this.notifyDependentDatasources('post');

            }.bind(this));
        }
    }

    replaceItemInData(obj: any) {
        // Get the list of keys
        var keyObj = this.getKeyValues(obj);

        // For each row data
        this.data.forEach(function(currentRow) {
            // Iterate all keys checking if the
            // current object match with the
            // extracted key values
            var found;
            var dataKeys = this.getKeyValues(currentRow);
            for (var key in keyObj) {
                if (dataKeys[key] && dataKeys[key] === keyObj[key]) {
                    found = true;
                } else {
                    found = false;
                    break;
                }
            }

            if (found) {
                this.copy(obj, currentRow);
                this.active = currentRow;
            }

            this.handleAfterCallBack(this.onAfterUpdate);
        }.bind(this));
    }

    notifyDependentDatasources(action) {
        if (this.dependentData) {
            this.dependentData.forEach(dataSourceDependent => {
                dataSourceDependent.storeAndResetDependentBuffer(action);
            }); 
        }
    }

    refreshActive () {
        // this.notificationsService.success(
        //     'Success',
        //     'Yeahhh successfull create notification'
        // );
        // this.notificationsService.error("erro kcete");
        // this.notificationsService.success("vai buchecha!");

        if (this.active) {
            var keyObj = this.getKeyValues(this.active);
            var url = this.entity;
            url += (this.entity.endsWith('/')) ? '' : '/';
            for (var key in keyObj) {
                url += this.active[key] + '/';
            }

            this.helperService.promiseHttp(new RequestArgs("GET", url, null, this.headers))
            .then( (rows:any) => {
                this.busy = false;
                var row = null;
                if (rows && rows.length > 0)
                    row = rows[0];

                var indexFound = -1;
                var i = 0;
                this.active = row;
                this.data.forEach(function(currentRow) {
                    var found = false;
                    var idsFound = 0;
                    var idsTotal = 0;
                    for (var key in keyObj) {
                        idsTotal++;
                        if (currentRow[key] && currentRow[key] === keyObj[key]) {
                            idsFound++;
                        }
                    }
                    if (idsFound == idsTotal)
                        found = true;

                    if (found) {
                        indexFound = i;
                        if (row)
                        this.copy(row, currentRow);
                    }
                    i++;
                }.bind(this));

                //Atualizou e o registro deixou de existir, remove da lista
                if (indexFound > -1 && !row) {
                    this.data.splice(indexFound, 1);
                }
            });
        }
    }

    getColumn (index) {
        var returnValue = [];
        $.each(this.data, function(key, value) {
            returnValue.push(value[index]);
        });
        return returnValue;
    }

    // Set this datasource back to the normal state
    onBackNomalState () {
        this.busy = false;
        this.editing = false;
        this.inserting = false;
    }

    /**
     * Cancel the editing or inserting state
     */
    cancel () {
        if (this.inserting) {
            if (this.cursor >= 0)
                this.active = this.data[this.cursor];
            else
                this.active = {};
        }
        if (this.editing) {
            this.active = this.lastActive;
        }

        this.onBackNomalState();
        this.lastAction = "cancel";
        this.notifyDependentDatasources(null);
    }


    retrieveDefaultValues () {
        if (this.entity.indexOf('cronapi') >= 0) {
            // Get an ajax promise
            var url = this.entity;
            url += (this.entity.endsWith('/')) ? '__new__' : '/__new__';
         
            let promise = new Promise((resolve, reject) => {
                this.http.get(url , this.headers)
                .toPromise()
                .then(
                  res => { 
                    this.active = res.json();
                    resolve(res.json());
                  },
                  error => {
                    this.active = {};
                    reject(error.json());
                  }
                );
            });
        } 
        else {
            this.active = {};
        }
    }

    /**
     * Put the datasource into the inserting state
     */
    startInserting () {
        this.inserting = true;
        this.retrieveDefaultValues();
        if (this.onStartInserting) {
            this.onStartInserting();
        }
        this.active = { id: "-1"};
        this.synchronizeDependentDatasources();
    }

    /**
     * Put the datasource into the editing state
     */
    startEditing(item) {
        if (item) {
            this.active = this.copy(item, null);
            this.lastActive = item;
        } else {
            this.lastActive = this.active;
            this.active = this.copy(this.active, null);
        }
        this.editing = true;
        this.synchronizeDependentDatasources();
    }

    synchronizeDependentDatasources() {
        //Tendo que sincronizar os datasources dependentes, pois no angular 5, apos instanciado, o valor da variavel permanece, mesmo que alterando o active
        if (this.dependentData) {
            this.dependentData.forEach(dependentDatasource => {
                if (dependentDatasource.entityBase.indexOf("//")) {
                    var keyObj = this.getKeyValues(this.active);
                    var suffixPath = '';
                    for (var key in keyObj) {
                        if (keyObj.hasOwnProperty(key)) {
                            suffixPath += '/' + keyObj[key];
                        }
                    }
                    suffixPath += '/';
                    dependentDatasource.entity = dependentDatasource.entityBase.replace('//', suffixPath);
                    var queryObj = {};
                    dependentDatasource.enabled = true;
                    dependentDatasource.fetch({params: queryObj},{
                        success: function(data) {
                          if (data && data.length > 0) {
                            dependentDatasource.active = data[0];
                            dependentDatasource.cursor = 0;
                          }
                        }
                      },
                      null
                    );
                }
            });
        }
    }

    /**
     * Remove an object from this dataset by using the given id.
     * the objects
     */
    remove (object, callback) {
        this.busy = true;

        var _remove = function(object, callback) {
            if (!object) {
                object = this.active;
            }

            var keyObj = this.getKeyValues(object);

            if (this.dependentBufferLazyPostData) {
                if (this.dependentBufferLazyPostData.indexOf(object) > -1) {
                    var indexObj = this.dependentBufferLazyPostData.indexOf(object);
                    this.dependentBufferLazyPostData.splice(indexObj, 1);
                    indexObj = this.data.indexOf(object);
                    if (indexObj > -1)
                        this.data.splice(indexObj, 1);
                    return;
                }
            }

            var suffixPath = "";
            for (var key in keyObj) {
                if (keyObj.hasOwnProperty(key)) {
                    suffixPath += "/" + keyObj[key];
                }
            }

            callback = callback || function() {
                // For each row data
                for (var i = 0; i < this.data.length; i++) {
                    // current object match with the same
                    // vey values
                    // Iterate all keys checking if the
                    var dataKeys = this.getKeyValues(this.data[i]);
                    // Check all keys
                    var found;
                    for (var key in keyObj) {
                        if (keyObj.hasOwnProperty(key)) {
                            if (dataKeys[key] && dataKeys[key] === keyObj[key]) {
                                found = true;
                            } else {
                                // There's a difference between the current object
                                // and the key values extracted from the object
                                // that we want to remove
                                found = false;
                                break;
                            }
                        }
                    }

                    if (found) {
                        // If it's the object we're loking for
                        // remove it from the array
                        this.data.splice(i, 1)
                        this.active = (i > 0) ? this.data[i - 1] : {};
                    }

                    this.onBackNomalState();
                }
                this.handleAfterCallBack(this.onAfterDelete);
            }.bind(this)

            if (this.handleBeforeCallBack(this.onBeforeDelete)) {
                this.service.remove(this.entity + suffixPath).then(callback);
            }
        }.bind(this);

        if (this.deleteMessage && this.deleteMessage.length > 0) {
            if (confirm(this.deleteMessage)) {
                _remove(object, callback);
            } else {
                this.filter(null);
            }
        } else {
            _remove(object, callback);
        }
    }

    /**
     * Get the object keys values from the datasource keylist
     * PRIVATE FUNCTION
     */
    getKeyValues(rowData) {
        var keys = this.keys;
        var keyValues = {};
        for (var i = 0; i < this.keys.length; i++) {
            var key = this.keys[i];
            var rowKey = null;
            try {
                rowKey = eval("rowData."+key);
            } catch(e){
                //
            }
            keyValues[key] = rowKey;
        }
        return keyValues;
    }

    /**
     * Check if two objects are equals by comparing their keys PRIVATE FUNCTION.
     */
    objectIsEquals (object1, object2) {
        var keys1 = this.getKeyValues(object1);
        var keys2 = this.getKeyValues(object2);
        for (var key in keys1) {
            if (keys1.hasOwnProperty(key)) {
                if (!keys2.hasOwnProperty(key)) return false;
                if (keys1[key] !== keys2[key]) return false;
            }
        }
        return true;
    }

    /**
     * Check if the object has more itens to iterate
     */
    hasNext () {
        return this.data && (this.cursor < this.data.length - 1);
    }

    /**
     * Check if the cursor is not at the beginning of the datasource
     */
    hasPrevious () {
        return this.data && (this.cursor > 0);
    }

    /**
     * Get the values of the given row
     */
    getRowValues (rowData: any) {
        var arr = [];
        for (var i in rowData) {
            if (rowData.hasOwnProperty(i)) {
                arr.push(rowData[i]);
            }
        }
        return arr;
    }

    /**
     *  Get the current item moving the cursor to the next element
     */
    next () {
        if (!this.hasNext()) {
            this.nextPage();
        }
        this.active = this.copy(this.data[++this.cursor], {});
        return this.active;
    }

    /**
     *  Try to fetch the next page
     */
    nextPage () {
        
        if (!this.hasNextPage()) {
            return;
        }
        if (this.apiVersion == 1 || this.entity.indexOf('/cronapi/') == -1) {
            this.offset = parseInt(this.offset) + parseInt(this.rowsPerPage);
        } 
        else {
            this.offset = parseInt(this.offset) + 1;
        }
        this.fetch(
            this._savedProps, 
            {
                success: function(data) {
                    if (!data || data.length < parseInt(this.rowsPerPage)) {
                        if (this.apiVersion == 1 || this.entity.indexOf('/cronapi/') == -1) {
                            this.offset = parseInt(this.offset) - this.data.length;
                        }
                    }
                }
            }, 
            true);
    }

    /**
     *  Try to fetch the previous page
     */
    prevPage () {
        if (!this.append && !this.preppend) {
            this.offset = parseInt(this.offset) - this.data.length;

            if (this.offset < 0) {
                this.offset = 0;
            } else if (this.offset >= 0) {
                this.fetch(
                    this._savedProps, 
                    {
                        success: function(data) {
                            if (!data || data.length === 0) {
                                this.offset = 0;
                            }
                        }
                    }, 
                    true
                );
            }
        }
    }

    /**
     *  Check if has more pages
     */
    hasNextPage () {
        return this.hasMoreResults && (this.rowsPerPage != -1);
    }

    /**
     *  Check if has previews pages
     */
    hasPrevPage () {
        return this.offset > 0 && !this.append && !this.prepend;
    }

    /**
     *  Get the previous item
     */
    previous () {
        if (!this.hasPrevious()) throw "Dataset Overflor Error";
        this.active = this.copy(this.data[--this.cursor], {});
        return this.active;
    }

    /**
     *  Moves the cursor to the specified item
     */
    goTo (rowId) {
        var splitedIds = rowId.split("|");

        for (var i = 0; i < this.data.length; i++) {
            var found = true;
            this.keys.forEach(key => {
                var hasSomeKey = false;
                for (var x = 0; x < splitedIds.length; x++) {
                    if (this.data[i][key] === splitedIds[x])
                        hasSomeKey = true;
                }
                if (!hasSomeKey)
                    found = false;
            });


            if (found) {
                this.cursor = i;
                this.active = this.copy(this.data[this.cursor], {});
                return this.active;
            }
        }
    }

    /**
     *  Get the current cursor index
     */
    getCursor () {
        return this.cursor;
    }

    /**
     *  filter dataset by URL
     */
    filter (url) {
        var oldoffset = this.offset;
        this.offset = 0;
        this.fetch(
            {
                path: url
            },
            {
                beforeFill: function(oldData) {
                    this.cleanup();
                },
                error: function(error) {
                    this.offset = oldoffset;
                }
            },
            null
        );
    }

    doSearchAll (terms, caseInsensitive) {
        this.searchTimeout = null;
        var oldoffset = this.offset;
        this.offset = 0;
        this.fetch(
            {
                params: {
                    filter: "%"+terms+"%",
                    filterCaseInsensitive: (caseInsensitive?true:false)
                }
            }, 
            {
                beforeFill: function(oldData) {
                    this.cleanup();
                },
                error: function(error) {
                    this.offset = oldoffset;
                }
            },
            null
        );
    }

    searchAll (terms, caseInsensitive) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
        this.searchTimeout = setTimeout(function() {
            this.doSearchAll(terms, caseInsensitive);
        }.bind(this), 500);
    }

    doSearch (terms: any, caseInsensitive: any) {
        this.searchTimeout = null;
        var oldoffset = this.offset;
        this.offset = 0;
        this.fetch(
            {
                params: {
                    filter: terms,
                    filterCaseInsensitive: (caseInsensitive?true:false)
                }
            }, 
            {
                beforeFill: function(oldData) {
                    this.cleanup();
                },
                error: function(error) {
                    this.offset = oldoffset;
                }
            }, 
            null
        );
    }

    search (terms, caseInsensitive) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }

        this.searchTimeout = setTimeout(function() {
            this.doSearch(terms, caseInsensitive);
        }.bind(this), 500);
    }

    /**
     *  refresh dataset by URL and queryParams,
     */
    refresh (query, url, minChar) {
        this.cleanup();
        if (minChar === undefined) {
            minChar = 0;
        }
        if (query.length >= minChar) {
            this.filter(url + "/" + query);
        }
    }

    /**
     * Cleanup datasource
     */
    cleanup() {
        this.offset = 0;
        this.data.length = 0;
        this.cursor = -1;
        this.active = {};
        this.hasMoreResults = false;
    }

    /**
     *  Get the current row data
     */
    current () {
        return this.active || this.data[0];
    }

    getLink (rel) {
        if (this.links) {
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].rel == rel) {
                    return this.links[i].href;
                }
            }
        }
    }

    // /**
    //  *  Fetch all data from the server
    //  */
    fetch (properties:any, callbacksObj:any, isNextOrPrev:any) {

        // Ignore any call if the datasource is busy (fetching another request)
        if (this.busy) return;

        //Ignore call witouth ids if not http:// or https://
        if (this.entity.indexOf('//') > -1 && this.entity.indexOf('://') < 0) return;

        if (!this.enabled) {
          this.cleanup();
          return;
        }

        var props = properties || {};
        var callbacks = callbacksObj || {};

        // Adjust property parameters and the endpoint url
        props.params = props.params || {};
        var resourceURL = (this.window.hostApp || "") + this.entity + (props.path || this.lastFilterParsed || "");

        //Check request, if  is dependentLazyPost, break old request
        if (this.dependentLazyPost) {
            if (eval(this.dependentLazyPost).active) {
                var checkRequestId = '';
                var keyDependentLazyPost = this.getKeyValues(eval(this.dependentLazyPost).active);
                for (var key in keyDependentLazyPost) {
                    checkRequestId = keyDependentLazyPost[key]
                    break;
                }
                if (checkRequestId && checkRequestId.length > 0)
                    if (resourceURL.indexOf(checkRequestId) == -1)
                        return;
            }
        }

        // Set Limit and offset
        if (this.rowsPerPage > 0) {
            if (this.apiVersion == 1 || resourceURL.indexOf('/cronapi/') == -1) {
                props.params.limit = this.rowsPerPage;
                props.params.offset = this.offset;
            } else {
                props.params.size = this.rowsPerPage;
                props.params.page = this.offset;
            }
        }

        // Stop auto post for awhile
        this.stopAutoPost();

        // Store the last configuration for late use
        this._savedProps = props;

        // Make the datasource busy
        this.busy = true;
     
        
        this.helperService.promiseHttp(new RequestArgs("GET", resourceURL, props.params, this.headers), 
            res => {
                this.busy = false;
                var data = res.json();
                this.sucessHandlerFetch(data, res.headers["_headers"], callbacks, isNextOrPrev);
            },
            error => {
                this.busy = false;
                var data = error.json();
                this.handleError(data);
                if (callbacks.error) callbacks.error.call(this, data);
            }
        );
       
    }

    // Success Handler
    sucessHandlerFetch (data: any, headers: any, callbacks: any, isNextOrPrev: any) {
        var springVersion = false;
        this.responseHeaders = headers || {};
        
        if (this.entity.indexOf('//') > -1 && this.entity.indexOf('://') < 0)
            data = [];
        if (data) {
            if (data._body)
                data = JSON.parse(data._body);

            if (Object.prototype.toString.call(data) !== '[object Array]') {
                if (data && data.links && Object.prototype.toString.call(data.content) === '[object Array]') {
                    this.links = data.links;
                    data = data.content;
                    springVersion = true;
                } else {
                    data = [data];
                }
            }
        } else {
            data = [];
        }

        // Call the before fill callback
        if (callbacks.beforeFill) callbacks.beforeFill.apply(this, this.data);

        if (isNextOrPrev) {
            // If prepend property was set.
            // Add the new data before the old one
            if (this.prepend) Array.prototype.unshift.apply(this.data, data);

            // If append property was set.
            // Add the new data after the old one
            if (this.append) Array.prototype.push.apply(this.data, data);

            // When neither  nor preppend was set
            // Just replace the current data
            if (!this.prepend && !this.append) {
                Array.prototype.push.apply(this.data, data);
                if (this.data.length > 0) {
                    this.active = data[0];
                    this.cursor = 0;
                } else {
                    this.active = {};
                    this.cursor = -1;
                }
            }
        } 
        else {
            this.cleanup();
            Array.prototype.push.apply(this.data, data);
            if (this.data.length > 0) {
                this.active = data[0];
                this.cursor = 0;
            }
        }
        this.columns = [];
        if (this.data.length > 0) {
            for (var i = 0; i < this.data[0].length; i++) {
                this.columns.push(this.getColumn(i));
            }
        }

        if (callbacks.success) callbacks.success.call(this, data);

        this.hasMoreResults = (data.length >= this.rowsPerPage);

        if (springVersion) {
            this.hasMoreResults = this.getLink("next") != null;
        }

        /*
            *  Register a watcher for data
            *  if the autopost property was set
            *  It means that any change on dataset items will
            *  generate a new request on the server
            */
        if (this.autoPost) {
            this.startAutoPost();
        }

        this.loaded = true;
        this.loadedFinish = true;
        this.handleAfterCallBack(this.onAfterFill);
        var thisDatasourceName = this.name;
        $('datasource').each(function(idx, elem) {
            var dependentBy = null;
            var dependent = eval(elem.getAttribute('name'));
            if (elem.getAttribute('dependent-by') !== "" && elem.getAttribute('dependent-by') != null) {
                try {
                    dependentBy = JSON.parse(elem.getAttribute('dependent-by'));
                } catch (ex) {
                    dependentBy = eval(elem.getAttribute('dependent-by'));
                }

                if (dependentBy) {
                    if (dependentBy.name == thisDatasourceName) {
                        if (!dependent.filterURL)
                            eval(dependent.name).fetch(null, null, null);
                            //if has filter, the filter observer will be called
                    }
                } else {
                    console.log('O dependente ' + elem.getAttribute('dependent-by') + ' do pai ' + thisDatasourceName + ' ainda não existe.')
                }
            }
        });
    }

    /**
     * Asynchronously notify observers
     */
    notifyObservers () {
        for (var key in this.observers) {
            if (this.observers.hasOwnProperty(key)) {
                var dataset = this.observers[key];
                setTimeout(function() {
                    dataset.notify.call(dataset, this.active);
                }.bind(this), 1);
            }
        }
    }

    notify (activeRow: any) {
        if (activeRow) {
            // Parse the filter using regex
            // to identify {params}
            var filter = this.watchFilter;
            var pattern = /\{([A-z][A-z|0-9]*)\}/gim;

            // replace all params found by the
            // respectiveValues in activeRow
            filter = filter.replace(pattern, function(a, b) {
                return activeRow.hasOwnProperty(b) ? activeRow[b] : "";
            });

            this.fetch(
                {
                    params: {
                        q: filter
                    }
                },
                null,
                null
            );
        }
    }

    addObserver (observer: any) {
        this.observers.push(observer);
    }

    // /**
    //  * Clone a JSON Object
    //  */
    copy (from: any, to: any) {
        if (from === null || Object.prototype.toString.call(from) !== '[object Object]')
            return from;

        to = to || {};

        for (var key in from) {
            if (from.hasOwnProperty(key) && key.indexOf('$') == -1) {
                to[key] = this.copy(from[key], null);
            }
        }
        //Verificando os campos que não existem mais no registro (Significa que foi setado para nulo)
        for (var key in to) 
            if (from[key] == undefined)
                delete to[key];
        return to;
    }


    private mergeData(newData: any, oldData: any) {
        if (!this.enabled) {
            this.unregisterDataWatch();
            return;
        }

        // Get the difference between both arrays
        var difSize = newData.length - oldData.length;

        if (difSize > 0) {
            // If the value is positive
            // Some item was added
            for (var i = 1; i <= difSize; i++) {
                // Make a new request
                this.insert(newData[newData.length - i], function() {});
            }
        } else if (difSize < 0) {
            // If it is negative
            // Some item was removed
            const _self = this;
            var removedItems = oldData.filter(function(oldItem) {
                return newData.filter(function(newItem) {
                    return _self.objectIsEquals(oldItem, newItem);
                }).length == 0;
            });

            for (var i = 0; i < removedItems.length; i++) {
                this.remove(removedItems[i], function() {});
            }
        }
    }

    /**
     * Used to monitore the this datasource data for change (insertion and deletion)
     */
    startAutoPost () {
        var data;
        this.dataWatchId = setInterval(function() {
            if (!data)
                data = this.data;
            if (data != this.data) {
                this.mergeData(this.data, data);
                data = this.data;
            }
        }.bind(this), 500);

        this.unregisterDataWatch = function() {
            clearInterval(this.dataWatchId);
            this.dataWatchId = undefined;
        }.bind(this);
    }

    /**
     * Unregister the data watcher
     */
    stopAutoPost() {
        // Unregister any defined watcher on data variable
        if (this.unregisterDataWatch) {
            this.unregisterDataWatch();
            this.unregisterDataWatch = undefined;
        }
    }

    hasDataBuffered () {
        return (this.dependentBufferLazyPostData && this.dependentBufferLazyPostData.length > 0)
    }
 
}