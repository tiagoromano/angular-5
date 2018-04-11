import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyNewDirectiveDirective } from './my-new-directive.directive';
// import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { TestComponentComponent } from './test-component/test-component.component';


import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppCustomModule } from './app.custom.module';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
// import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
// import { ImportClass } from './common/import-class.component';
import {UIRouterModule} from "@uirouter/angular";
// import {mainState, loginState, homeState, homePageState, testState} from "./app.states";
import { AppRoutingModule } from './app-routing.module';
import { CronappSecurityDirective } from './cronapp-security.directive';

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
    CronappSecurityDirective,
  ],
  imports: [
    // 
    // UIRouterModule.forRoot({
    //   states:[
    //     mainState,
    //     loginState,
    //     homeState,
    //     homePageState,
    //     testState
    //   ],
    //   useHash : true,
    //   config: uiRouterConfigFn
    // }),
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
    CommonVariableProvider
  ],
  exports: [
    // TranslateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   
}
