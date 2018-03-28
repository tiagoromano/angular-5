import { Component, OnInit, Input, Injector, VERSION, ViewChild, NgModule, NgModuleRef, ViewContainerRef, Compiler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-page',
  template: "<ng-container #vc></ng-container>",
})

export class PageComponent implements OnInit {

  @Input() src: string;
  @ViewChild('vc', {read: ViewContainerRef}) vc;

  private thiago: any;
  constructor( private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>, private route:ActivatedRoute,
    private httpService: HttpClient
   ) {
    this.thiago = "lindo";
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.route.params.subscribe(p=> {
      this.httpService.get('../../../views/'+p.folder+'/'+p.page+'.view.html', {responseType: 'text'}).subscribe(
        data => {
          debugger;
          this.thiago = data;

          let templatePath = '../' + p.folder + '/' + p.page + '.component.html';
          // let templateContent: string = data.toString();
    
          let templateW = '../login/login.component.html';
    
          //var templateContent = require('../login/login.component.html');
    
          debugger;
    
          this.src = "teste: " + this.thiago;
          const tmpCmp = Component({
            moduleId: module.id, 
            template: this.src
    
          })      
          (
            class {
              definedVariable = "hahahahah"
              constructor () {
                debugger; 
              }
            }
          );
          const tmpModule = NgModule({declarations: [tmpCmp]})(class {
          });
          this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
              debugger;
              const f = factories.componentFactories[0];
              const cmpRef = f.create(this._injector, [], null, this._m);
              cmpRef.instance.name = 'dynamic'+p.page;
              debugger;
              this.vc.remove(0);
              this.vc.insert(cmpRef.hostView);
          });

        },
        (err: HttpErrorResponse) => {
          this.thiago = err.message;
          console.log (err.message);
        }
      );
    });//end route.params
  }
}
