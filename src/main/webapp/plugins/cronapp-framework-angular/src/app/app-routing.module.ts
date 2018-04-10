import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RootModule, UIRouterModule, Transition } from '@uirouter/angular';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';

// const routes: Routes = [
//     {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: '',
//     component: LoginComponent
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
//   {
//     path: 'home/:folder/:page',
//     component: HomeComponent,
//   }
// ];

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
          resolveFn: (trans: Transition) => {
            debugger;
            return trans.params();
            // return trans;
          } 
        }
      ]
    }
  ],
  useHash: true,
  otherwise: "/login"
};


@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  // exports: [RouterModule]
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class AppRoutingModule { }


// // import { HomeComponent } from "./home/home.component";
// // import { LoginComponent } from "./login/login.component";
// // import { PageComponent } from "./page/page.component";
// // import { TestComponentComponent } from "./test-component/test-component.component";
// // import { Transition } from "@uirouter/angular";




// // export const homePageState = { 
// //     name: 'home.pages', 
// //     url: '/:folder/:page',  
// //     component: PageComponent,
// //     resolve: [
// //         { 
// //           token: 'pages', 
// //           deps: [Transition, 'child'],
// //           resolveFn: (trans, child) => {
// //               debugger;
// //               return trans.params().page;
// //           } 
// //               //people.find(person => person.id === trans.params().personId)
// //         }
// //       ] 
// // };
// // export const homePageState = { 
// //     name: 'home.pages', 
// //     url: '/:pages',  
// //     component: PageComponent,
// //     resolve: [
// //         { 
// //           token: 'pages', 
// //           deps: [Transition, 'child'],
// //           resolveFn: (trans, child) => {
// //               debugger;
// //               return trans.params().pages;
// //           } 
// //               //people.find(person => person.id === trans.params().personId)
// //         }
// //       ] 
// // };

// // export const homePageState = { 
// //     name: 'home.pages', 
// //     url: '/{name:.*}',  
// //     component: PageComponent,
// // };




// import { NgModule } from '@angular/core';
// import { RootModule, UIRouterModule, Transition } from '@uirouter/angular';
// import { LoginComponent } from './login/login.component';
// import { TestComponentComponent } from './test-component/test-component.component';
// import { HomeComponent } from './home/home.component';
// import { PageComponent } from './page/page.component';

// const rootModule: RootModule = {
//   states: [
//     { name: 'main', url: '',  component: LoginComponent },
//     { name: 'login', url: '/',  component: LoginComponent },
//     { name: 'test', url:'/test', component: TestComponentComponent},
//     { 
//         name: 'home', 
//         url: '/home',  
//         component: HomeComponent,
//         resolve: [{
//             token: 'child',
//             resolveFn: () => 1
//         }]
//     },
//     { 
//         name: 'home.pages', 
//         url: '/:folder/:page',  
//         component: PageComponent,
//         resolve: [
//             { 
//               token: 'pages', 
//               deps: [Transition, 'child'],
//               resolveFn: (trans, child) => {
//                   debugger;
//                   return trans.params().page;
//               } 
//             }
//         ] 
//     }
//   ],
// //   config: (router, injector, states) => 
// //   {
// //     router.transitionService.onStart(
// //       {
// //         to: state => {
// //           let match = state.name == "hello";
// //           return match;
// //         }
// //       },
// //       transition => {
        
// //       });
// //   },
//   useHash: true,
//   otherwise: "/login"
// };

// @NgModule({
//   imports: [UIRouterModule.forRoot(rootModule)],
//   exports: [UIRouterModule]
// })
// export class AppRoutingModule { }
