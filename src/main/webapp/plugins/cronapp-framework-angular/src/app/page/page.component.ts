import { Component, OnInit, Injector, ViewChild, NgModule, NgModuleRef, ViewContainerRef, Compiler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';

@Component({
  selector: 'app-page',
  template: "<ng-container #vc></ng-container>",
})

export class PageComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private route:ActivatedRoute, private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(p=> {
      this.httpService.get('../../../views/'+p.folder+'/'+p.page+'.view.html', {responseType: 'text'}).subscribe(
        viewContent => {
          
          this.helperServiceProvider.createDynamicComponent(this.vc, viewContent);

          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    });
  }
}
