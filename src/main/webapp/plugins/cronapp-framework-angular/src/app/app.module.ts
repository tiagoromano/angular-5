import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppCustomModule } from './app.custom.module';
// import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { CommonVariableProvider } from '../providers/common-variable/common-variable';
import {UIRouterModule} from "@uirouter/angular";
import { AppRoutingModule } from './app-routing.module';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';
// import { DatasourceDirective } from './datasource.directive';
import { ComponentServiceProvider } from '../providers/component-service/component-service';
// import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';
// import { DatasourceDirective } from './datasource.directive';

// const appRoutes:Routes = [
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: '',
//     component: HomeComponent
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
//   {
//     path: 'home/:folder/:page',
//     component: PageComponent,
//   },
//   {
//     path: 'test',
//     component: TestComponentComponent,
//   }

// ]

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    LoginComponent,
    TestComponentComponent,
    // DatasourceDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppCustomModule,
  ],
  providers: [
    HomeComponent, 
    PageComponent, 
    LoginComponent,
    HelperServiceProvider,
    CommonVariableProvider,
    DatasourceManagerProvider,
    ComponentServiceProvider
  ],
  exports: [
    // TranslateModule
    // DatasourceDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   
}
