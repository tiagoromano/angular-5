import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyNewDirectiveDirective } from './my-new-directive.directive';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { TestComponentComponent } from './test-component/test-component.component';


import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppCustomModule } from './app.custom.module';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';

const appRoutes:Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home/:folder/:page',
    component: PageComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MyNewDirectiveDirective,
    HomeComponent,
    PageComponent,
    LoginComponent,
    TestComponentComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppCustomModule
  ],
  providers: [
    HomeComponent, 
    PageComponent, 
    LoginComponent,
    HelperServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
