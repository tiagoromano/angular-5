import { Component, OnInit, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PageComponent } from '../page/page.component';
import { ImportClass } from '../common/import-class.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { CommonVariableProvider } from '../../providers/common-variable/common-variable';
import { StateService } from '@uirouter/core';
import { ComponentServiceProvider } from '../../providers/component-service/component-service';
import { RequestArgs } from '../../providers/helper-service/request-args';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  template: "<ng-container #vc></ng-container>",
})
export class LoginComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc;
  
  constructor(private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider, 
              private componentServiceProvider: ComponentServiceProvider) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.httpService.get('../../../views/login.view.html', {responseType: 'text'}).subscribe(
      viewContent => {
        
        var contextClass = class extends ImportClass {

          vars: any;
          message: any;
          username: any;
          password: any;
          http: Http;
          helperService: HelperServiceProvider;
          commonVariable: CommonVariableProvider;
          stateService: StateService;
          notificationsService: NotificationsService;
          translate: TranslateService;
          
          
          initialize(translate: TranslateService, translateModule: TranslateModule, http: Http, helperService: HelperServiceProvider, 
            commonVariable: CommonVariableProvider, httpService: HttpClient, stateService: StateService, notificationsService: NotificationsService): void {
            this.vars = {};
            this.message = { error: ""};
            this.username = {value: "" };
            this.password = { value: ""};
            this.http = http;
            this.helperService = helperService;
            this.commonVariable = commonVariable;
            this.stateService = stateService;
            this.notificationsService = notificationsService;
            this.translate = translate;
          }

          login(user, password, token) {
            var requestOptions = new RequestOptions({
              headers: new Headers({
                'Content-Type':  'application/x-www-form-urlencoded',
              })
            });

            
            var userParam = {
              username: user?user:this.username.value,
              password: password?password:this.password.value
            };

           
            this.helperService.promiseHttp(new RequestArgs("POST", "auth", userParam, requestOptions), null, this.errorLogin.bind(this))
            .then(data => {
              this.successLogin(data);
            });
          }

          successLogin(data) {
            this.commonVariable.startSession(data);
            this.stateService.go('home');
          }

          errorLogin(error:any, reject: any) {
            var data = {};
            if (error._body && error._body.length)
              data = error.json();

            var err = error.status == 401 ? this.translate.instant('Login.view.invalidPassword') : data;
            this.notificationsService.error(err);
            console.log(error);
          }


        };

        this.componentServiceProvider.createDynamicComponentWithContextClass(contextClass, this.vc, viewContent);          
      },
      (err: HttpErrorResponse) => {
        console.log (err);
      }
    );
  }

}
