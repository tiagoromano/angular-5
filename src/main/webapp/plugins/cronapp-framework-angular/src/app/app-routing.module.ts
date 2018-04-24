import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RootModule, UIRouterModule, Transition } from '@uirouter/angular';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { TestComponentComponent } from './test-component/test-component.component';

const rootModule: RootModule = {
  states: [
    {
      name: "login",
      url: "/login",
      component: LoginComponent,
    },
    {
      name: "home",
      url: "/home",
      component: HomeComponent,
    },
    {
      name: "home.pages",
      url: "/{name:.*}",
      component: PageComponent,
      resolve: [
        {
          token: "parameters",
          deps: [Transition],
          resolveFn: (trans: Transition) => trans.params()
        }
      ]
    },
    {
      name: "test",
      url: "/test",
      component: TestComponentComponent,
    },
  ],
  useHash: true,
  otherwise: "/login"
};


@NgModule({
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class AppRoutingModule { }