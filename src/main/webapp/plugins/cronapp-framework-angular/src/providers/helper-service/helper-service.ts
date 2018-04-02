import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { ngModuleJitUrl } from "@angular/compiler";

@Injectable()
export class HelperServiceProvider {


    private attributes : Map<string, string> = new Map<string, string>();

    constructor( private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>, private translateService: TranslateService) {
        this.fillAttributes();
    }

    private fillAttributes() {
        this.attributes.set("ng-model", "([ngModel])");
        //this.attributes.get("ng-model")
    }

    private str2DOMElement(html) {
        var frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);             
        frame.contentDocument.open();
        frame.contentDocument.write(html);
        frame.contentDocument.close();
        var el = frame.contentDocument.body.firstChild;
        document.body.removeChild(frame);
        return el;
    }

    parseAttributesAngular5(viewContent: string) {
        //var parser = new DOMParser()
        debugger;
        
        var el = <HTMLScriptElement>this.str2DOMElement(viewContent);
        var tags = el.getElementsByTagName("*");
        let tagsToReplace: Map<string, string> = new Map<string, string>();

        for (var i = 0; i < tags.length; i++) {
            var hasReplacement = false;
            var outerHTML = tags[i].outerHTML;
            var indexGT = outerHTML.indexOf(">") + 1;
            let tagFully:string = outerHTML.substr(0, indexGT);
            var tagFullyReplaced = tagFully;

            this.attributes.forEach((value, key)=> {
                if (tags[i].hasAttribute(key)) {
                    hasReplacement = true;
                    tagFullyReplaced = tagFullyReplaced.split(key).join(value);
                }
            });
            if (hasReplacement)
                tagsToReplace.set(tagFully,tagFullyReplaced);
        }
        tagsToReplace.forEach((value, key) => {
            viewContent = viewContent.split(key).join(value);
        });
        return viewContent;
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
            const tmpModule = NgModule({declarations: [tmpCmp]})(contextClass);
            this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                debugger;
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'dynamic';
                viewChild.remove(0);
                viewChild.insert(cmpRef.hostView);
            });
    }
}