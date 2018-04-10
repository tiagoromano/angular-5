import { Component, OnInit, Injector, ViewChild, NgModule, NgModuleRef, ViewContainerRef, Compiler, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { Transition } from '@uirouter/core';

@Component({
  selector: 'app-page',
  template: "<ng-container #vc></ng-container>",
})

export class PageComponent implements OnInit {

  @Input() parameters:any;
  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.httpService.get('../../../views/'+ this.parameters.name + '.view.html', {responseType: 'text'}).subscribe(
      viewContent => {
        this.helperServiceProvider.createDynamicComponent(this.vc, viewContent);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
