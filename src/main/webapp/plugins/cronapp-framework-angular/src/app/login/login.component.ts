import { Component, OnInit, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageComponent } from '../page/page.component';
import { ImportClass } from '../common/import-class.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { CommonVariableProvider } from '../../providers/common-variable/common-variable';

@Component({
  selector: 'app-login',
  template: "<ng-container #vc></ng-container>",
})
export class LoginComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc;
  
  constructor(private route:ActivatedRoute, private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(p=> {
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
            router: Router;
            
            
            initialize(translate: TranslateService, http: Http, helperService: HelperServiceProvider, commonVariable: CommonVariableProvider, router: Router): void {
              this.vars = { };
              this.message = { error: ""};
              this.username = {value: "" };
              this.password = { value: ""};
              this.http = http;
              this.helperService = helperService;
              this.commonVariable = commonVariable;
              this.router = router;
            }

            

            

            login(user, password, token) {
              debugger;
              var requestOptions = new RequestOptions({
                headers: new Headers({
                  'Content-Type':  'application/x-www-form-urlencoded',
                })
              });

              // if (token)
              //   httpOptions.headers.set("X-AUTH-TOKEN", token);
              
              var userParam = {
                username: user?user:this.username.value,
                password: password?password:this.password.value
              };

              this.http.post('auth', this.helperService.parseJsonToUrlParameters(userParam), requestOptions).subscribe(
                this.successLogin.bind(this),
                this.errorLogin.bind(this)
              );

            }

            successLogin(data) {
              debugger;
              this.commonVariable.startSession(data._body);
              this.router.navigate(['home']);
            }

            errorLogin(err:HttpErrorResponse) {
              debugger;
              if (err.error instanceof Error) {
                console.log('Client-side error occured.');
              } else {
                console.log('Server-side error occured.');
              }
            }


          };

          viewContent = this.helperServiceProvider.parseAttributesAngular5(viewContent);
          this.helperServiceProvider.createDynamicComponentWithContextClass(contextClass, this.vc, viewContent);          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    });
  }

}
