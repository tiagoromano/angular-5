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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {UIRouterModule} from "@uirouter/angular";
import { AppRoutingModule } from './app-routing.module';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';
import { ComponentServiceProvider } from '../providers/component-service/component-service';
import { SimpleNotificationsModule, optionsFactory } from 'angular2-notifications';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';


// library.add(faCoffee);

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    LoginComponent,
    TestComponentComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    // AngularFontAwesomeModule,
    // FontAwesomeModule,
    AppCustomModule,
    SimpleNotificationsModule.forRoot(
      optionsFactory( 
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50,
          position: ["top", "right"]
        }
      )
    )
  ],
  providers: [
    HomeComponent, 
    PageComponent, 
    LoginComponent,
    HelperServiceProvider,
    CommonVariableProvider,
    DatasourceManagerProvider,
    ComponentServiceProvider,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   
}
