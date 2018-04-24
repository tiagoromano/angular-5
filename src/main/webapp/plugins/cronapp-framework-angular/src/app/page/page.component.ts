import { Component, OnInit, Injector, ViewChild, NgModule, NgModuleRef, ViewContainerRef, Compiler, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Transition } from '@uirouter/core';
import { ComponentServiceProvider } from '../../providers/component-service/component-service';

@Component({
  selector: 'app-page',
  template: "<ng-container #vc></ng-container>",
})

export class PageComponent implements OnInit {

  @Input() parameters:any;
  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private httpService: HttpClient, private componentServiceProvider: ComponentServiceProvider) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.httpService.get('../../../views/'+ this.parameters.name + '.view.html', {responseType: 'text'}).subscribe(
      viewContent => {
        this.componentServiceProvider.createDynamicComponent(this.vc, viewContent);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
