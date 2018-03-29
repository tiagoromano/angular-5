import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { ActivatedRoute } from '@angular/router';

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
          debugger;
          var contextClass = class {
            //Adicionar aqui as variaveis de login
            
            vars: any;
            constructor () {
                debugger;
                this.vars= {};
                
            }
          };
          this.helperServiceProvider.createDynamicComponentWithContextClass(contextClass, this.vc, viewContent);

          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    });
  }

}
