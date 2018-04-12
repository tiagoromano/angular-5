import { Injectable } from "@angular/core";
import { DataSet } from "./dataset";
import { CommonVariableProvider } from "../common-variable/common-variable";
import { Http } from "@angular/http";
import { HelperServiceProvider } from "../helper-service/helper-service";

@Injectable()
export class DatasourceManagerProvider {

    private window: any;
    private datasets = {};

    constructor(private commonVariable: CommonVariableProvider, private http: Http, private helperService: HelperServiceProvider) {
        this.window = (window as any);
    }

    private storeDataset(dataset: any) {
        this.datasets[dataset.name] = dataset;
    }

    /**
     * Register a dataset as an observer to another one
     */
    private registerObserver (targetName, dataset) {
        this.datasets[targetName].addObserver(dataset);
    };

    getAllDataset() {
        return this.datasets;
    }

    initDataset(props:any, scope: any) {
        var endpoint = (props.endpoint) ? props.endpoint : "";
        var dts = new DataSet(props.name, scope, this.http, this.helperService);
        var defaultApiVersion = this.commonVariable.config.datasourceApiVersion;

        dts.entity = props.entity;
        dts.apiVersion = props.apiVersion ? parseInt(props.apiVersion) : defaultApiVersion;
        dts.keys = (props.keys && props.keys.length > 0) ? props.keys.split(",") : [];
        dts.rowsPerPage = props.rowsPerPage ? props.rowsPerPage : 100; // Default 100 rows per page
        dts.append = props.append;
        dts.prepend = props.prepend;
        dts.endpoint = props.endpoint;
        dts.filterURL = props.filterURL;
        dts.autoPost = props.autoPost;
        dts.deleteMessage = props.deleteMessage;
        dts.enabled = props.enabled;
        dts.offset = (props.offset) ? props.offset : 0; // Default offset is 0
        dts.onError = props.onError;
        dts.defaultNotSpecifiedErrorMessage = props.defaultNotSpecifiedErrorMessage;
        dts.onAfterFill = props.onAfterFill;
        dts.onBeforeCreate = props.onBeforeCreate;
        dts.onAfterCreate = props.onAfterCreate;
        dts.onBeforeUpdate = props.onBeforeUpdate;
        dts.onAfterUpdate = props.onAfterUpdate;
        dts.onBeforeDelete = props.onBeforeDelete;
        dts.onAfterDelete = props.onAfterDelete;
        dts.dependentBy = props.dependentBy;

        if (props.dependentLazyPost && props.dependentLazyPost.length > 0) {
          dts.dependentLazyPost = props.dependentLazyPost;
          eval(dts.dependentLazyPost).addDependentData(dts);
        }

        dts.dependentLazyPostField = props.dependentLazyPostField; //TRM

        // Check for headers
        if (props.headers && props.headers.length > 0) {
          dts.headers = {"X-From-DataSource": "true"};
          var headers = props.headers.trim().split(";");
          var header;
          for (var i = 0; i < headers.length; i++) {
            header = headers[i].split(":");
            if (header.length === 2) {
              dts.headers[header[0]] = header[1];
            }
          }
        }

        
        dts.allowFetch = true;

        if (dts.dependentBy && dts.dependentBy !== "" && dts.dependentBy.trim() !== "") {
          dts.allowFetch = false;

          //if dependentBy was loaded, the filter in this ds not will be changed and the filter observer not will be called
          var dependentBy = null;
          try {
            dependentBy = JSON.parse(dependentBy);
          } catch (ex) {
            dependentBy = eval(dependentBy);
          }

          if (dependentBy && dependentBy.loadedFinish)
            dts.allowFetch = true;
        }

        if (!props.lazy && dts.allowFetch && (Object.prototype.toString.call(props.watch) !== "[object String]") && !props.filterURL) {
          // Query string object
          var queryObj = {};

          // Fill the dataset
          dts.fetch({
            params: queryObj
          }, {
            success: function(data) {
              if (data && data.length > 0) {
                this.active = data[0];
                this.cursor = 0;
              }
            }
          },
            null);
        }

        // if (props.lazy && props.autoPost) {
        //   dts.startAutoPost();
        // }

        // if (props.watch && Object.prototype.toString.call(props.watch) === "[object String]") {
        //   this.registerObserver(props.watch, dts);
        //   dts.watchFilter = props.watchFilter;
        // }

        // // Filter the dataset if the filter property was set
        // if (props.filterURL && props.filterURL.length > 0 && dts.allowFetch) {
        //   dts.filter(props.filterURL);
        // }

        // // Add this instance into the root scope
        // // This will expose the dataset name as a
        // // global variable
        // $rootScope[dts.name] = dts;

        this.storeDataset(dts);
        window[dts.name] = dts;
        scope[dts.name] = dts;

        return dts;
    }

}