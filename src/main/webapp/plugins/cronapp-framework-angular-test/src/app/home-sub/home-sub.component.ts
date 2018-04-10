import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';

@Component({
  selector: 'app-home-sub',
  template: "<ng-container #vc></ng-container>",
})
export class HomeSubComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc;
  @Input() parameters;

  constructor(private httpService: HttpClient, private helperServiceProvider: HelperServiceProvider) 
  { 

  }

  ngOnInit() {
    debugger;
    var ok = this.parameters;
  }

  ngAfterViewInit() {
    debugger;
    var ok = this.parameters.name;
    this.httpService.get('../../../views/admin/simple.view.html', {responseType: 'text'}).subscribe(
      viewContent => {

        this.helperServiceProvider.createDynamicComponent(this.vc, viewContent);

        
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }


}
