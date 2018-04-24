import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperServiceProvider } from '../../providers/helper-service/helper-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonVariableProvider } from '../../providers/common-variable/common-variable';
import { StateService } from '@uirouter/core';
import { BaseComponent } from '../../common/base-component.component';

@Component({
  selector: 'app-home',
  templateUrl: "../../../../../views/logged/home.view.html"
})
export class HomeComponent extends BaseComponent implements OnInit {
  
  session: any;

  initialize(): void {
  }

  ngOnInit() {
    this.session = this.commonVariable.getSession();
  }

  ngAfterViewInit() {
  }
}
