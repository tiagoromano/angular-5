import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { ImportClass } from '../common/import-class.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonVariableProvider } from '../../providers/common-variable/common-variable';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: "<ng-container #vc></ng-container>",
})
export class HomeComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private route: ActivatedRoute, private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider) {
    debugger;
  }

  ngOnInit() {
    debugger;
  }

  ngAfterViewInit() {
    this.route.params.subscribe(p=> {
      this.httpService.get('../../../views/logged/home.view.html', {responseType: 'text'}).subscribe(
        viewContent => {
          
          var contextClass = class extends ImportClass {

            session: any;

            vars: any;
            http: Http;
            helperService: HelperServiceProvider;
            commonVariable: CommonVariableProvider;
            router: Router;
            
            initialize(translate: TranslateService, http: Http, helperService: HelperServiceProvider, commonVariable: CommonVariableProvider, router: Router): void {
              this.vars = { };
              this.http = http;
              this.helperService = helperService;
              this.commonVariable = commonVariable;
              this.session = commonVariable.getSession();
              this.router = router;
            }
          };

          viewContent = this.helperServiceProvider.parseAttributesAngular5(viewContent);
          this.helperServiceProvider.createDynamicComponentWithContextClass(contextClass, this.vc, viewContent);          
          // this.helperServiceProvider.createDynamicComponent( this.vc, viewContent);          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    })
  }
}