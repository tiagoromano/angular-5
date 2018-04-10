import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RootModule, UIRouterModule, Transition } from '@uirouter/angular';
import { HomeSubComponent } from './home-sub/home-sub.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
    {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home/:folder/:page',
    component: PageComponent,
  },
  // {
  //   path: 'test',
  //   component: TestComponentComponent,
  // }
];

// const rootModule: RootModule = {
//   states: [
//     {
//       name: "home",
//       url: "/home",
//       component: HomeComponent,
//     },
//     {
//       name: "home.pages",
//       url: "/{name:.*}",
//       component: HomeSubComponent,
//       resolve: [
//         {
//           token: "parameters",
//           deps: [Transition],
//           resolveFn: (trans: Transition) => {
//             debugger;
//             return trans.params();
//           } 
//         }
//       ]
//     }
//   ],
//   useHash: true,
//   otherwise: "/hello"
// };


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // imports: [UIRouterModule.forRoot(rootModule)],
  // exports: [UIRouterModule]
})
export class AppRoutingModule { }
