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
            message: any;
            username: any;
            password: any;
            
            initialize(translate: TranslateService): void {
              debugger;
              this.vars = { nome: "burrao" };
              this.message = { error: ""};
              this.username = {value: "tiagoromano" };
              this.password = { value: "jorge"};
            }

            login(user, password, token) {
              debugger;
              var okk2 = this.username;
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
