import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeSubComponent } from './home-sub/home-sub.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppCustomModule } from './app.custom.module';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
// import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
// import { ImportClass } from './common/import-class.component';
import {UIRouterModule} from "@uirouter/angular";
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
// import {mainState, loginState, homeState, homePageState, testState} from "./app.states";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    LoginComponent,
    HomeSubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    AppCustomModule,
  ],
  providers: [
    HelperServiceProvider,
    CommonVariableProvider
  ],
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
