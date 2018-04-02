import { Component, OnInit, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageComponent } from '../page/page.component';
import { ImportClass } from '../common/importClass.component';

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
            testeMeuOvo:any;
            message: any;
            
            initialize(translate: TranslateService): void {
              debugger;
              this.vars = {};
              this.testeMeuOvo = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
              this.message = { error: "AAAAA"};
            }
            //Adicionar aqui as variaveis de login
            // translate: any;
            // constructor () {
              // debugger;
              // this.vars= {};
              // this.translate = (<any>window).translate;
            // }

            qualquer() {
              // this.translate
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
