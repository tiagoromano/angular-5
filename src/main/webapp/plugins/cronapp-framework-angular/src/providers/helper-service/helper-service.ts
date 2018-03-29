import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef} from "@angular/core";

@Injectable()
export class HelperServiceProvider {

    constructor( private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>) {
    }

    createDynamicComponent(viewChild: any, viewContent:any) {
        const tmpCmp = Component({
            moduleId: module.id,
            template: viewContent
            })
            (
                class {
                    // definedVariable = "hahahahah"
                    //TODO: Adicionar nesse Componente dinamico as dependencias, cronapi... userEvents... (NgModule - abaixo)
                    vars: any;
                    constructor () {
                        this.vars= {};
                    }
                }
            );
            const tmpModule = NgModule({declarations: [tmpCmp]})(class {});
            this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'dynamic';
                viewChild.remove(0);
                viewChild.insert(cmpRef.hostView);
            });
    }

    createDynamicComponentWithContextClass(contextClass:any ,viewChild: any, viewContent:any) {
        const tmpCmp = Component({
            moduleId: module.id,
            template: viewContent
            })
            (
                contextClass
            );
            const tmpModule = NgModule({declarations: [tmpCmp]})(class {});
            this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'dynamic';
                viewChild.remove(0);
                viewChild.insert(cmpRef.hostView);
            });
    }
}
