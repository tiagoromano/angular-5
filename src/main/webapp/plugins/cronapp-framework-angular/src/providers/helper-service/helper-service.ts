import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { ngModuleJitUrl } from "@angular/compiler";
import { AppCustomModule } from "../../app/app.custom.module";

@Injectable()
export class HelperServiceProvider {


    private attributesToReplace : Map<string, string> = new Map<string, string>();
    private attributesToSetInTag : any = [];

    
    constructor( private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>, private translateService: TranslateService) {
        this.fillAttributes();
    }

    private fillAttributes() {
        this.attributesToReplace.set("ng-model", "[(ngModel)]");
        this.attributesToReplace.set("ng-submit", "(ngSubmit)");
        this.attributesToReplace.set("ng-src", "src");
        this.attributesToReplace.set("aria-label", "attr.aria-label");
        // <ui-view>
        
        
        //Atributos que devem ser setados nas tags (elementos)
        //Irá inserir nos elementos que estejam dentro do "containerTag", o valor do "attributeToSet", desde que o elemento contenha o atributo setado
        //no "hasAttribute", caso o "containerTag" seja vazio, será setado o "attributeToSet" em todos os elementos que contenham o "hasAttribute"
        this.attributesToSetInTag.push( {containerTag: "form", hasAttribute: "ng-model", attributeToSet:"[ngModelOptions]=\"{standalone:true}\"" } );
    }

    private getAttributes(element: string) {
        var assignedValuesInAttr = [];
        var assignmentChar = ["'","\""];

        element = element.replace(">","").replace("<","");
        var idxFirstSpace = element.indexOf(" ");
        if (idxFirstSpace == -1)
            element = "";
        else
            element = element.substr(idxFirstSpace);
        assignmentChar.forEach(signment => {
            var elementToVerify = element;
            while (elementToVerify.indexOf(signment) > -1) {
                var idxStart = elementToVerify.indexOf(signment);
                if (idxStart < elementToVerify.length - 1) {
                    elementToVerify = elementToVerify.substr(idxStart + 1);
                    var idxEnd = elementToVerify.indexOf(signment);
                    if (idxEnd <= elementToVerify.length -1 && idxEnd > 0) {
                        var assignedValues = elementToVerify.substr(0, idxEnd).split(" ");
                        assignedValues.forEach(av=> { assignedValuesInAttr.push(av) });
                    }
                    elementToVerify = elementToVerify.replace(signment, "");
                }
            }
        });

        assignmentChar.forEach(signment => { element = element.split(signment).join("")});
        var rawAttributes = element.split("=").join(" ").split(" ");
        var attrs = [];
        rawAttributes.forEach(ra => {
            if (!assignedValuesInAttr.includes(ra) && ra.length > 0)
                attrs.push(ra);
        });
        return attrs;
    }

    private getTagsHtml(html: string) {
        var result = [];
        var tags = html.split('<');
        for (var i = 0; i < tags.length; i++) {
            var indexFirstSpace = tags[i].indexOf(" ");
            if (indexFirstSpace > -1) {
                var tag = { name:"", raw:"", startTag: false, endTag: false, attributes:[] };
                tag.name = tags[i].substr(0, indexFirstSpace);
                
                //despreza, tags de comentários
                if (tag.name.startsWith("!--")) {
                    continue;
                }
                else if (tag.name.indexOf(">")>-1) {
                    //ajusta, tags simples
                    var idxGT = tag.name.indexOf(">");
                    tag.name = tag.name.substr(0, idxGT);
                }
                tag.endTag = tag.name.startsWith('/');
                tag.startTag = !tag.name.startsWith('/');
                if (tag.endTag) 
                    tag.name = tag.name.replace("/","");
                var indexGT = tags[i].indexOf(">") + 1;
                tag.raw = '<' + tags[i].substr(0, indexGT);
                tag.attributes = this.getAttributes(tag.raw);
                result.push(tag);
            }
        }
        return result;
    }

    private isInsideTag(containerTag: string, idxTag: number, tags:any) {
        if (containerTag.length == 0)
            return true;
        else {
            var endTagsIds = [];
            var startTagsIds = [];
            var idxSearchEnd = tags.length - 1;
            
            while (idxSearchEnd > -1) {
                if (tags[idxSearchEnd].name == containerTag && tags[idxSearchEnd].endTag && !endTagsIds.includes(idxSearchEnd)) {
                    endTagsIds.push(idxSearchEnd);
                    for (var i = idxSearchEnd; i > -1; i--) {
                        if (tags[i].name == containerTag && tags[i].startTag && !startTagsIds.includes(i)) {
                            startTagsIds.push(i);

                            if (idxTag < idxSearchEnd && idxTag > i)
                                return true;
                            break;
                        }
                    }
                }
                idxSearchEnd--; 
            }
        }
        return false;
    }

    parseAttributesAngular5(viewContent: string) {
        var tags = this.getTagsHtml(viewContent);
        let tagsToReplace: Map<string, string> = new Map<string, string>();

        for (var i = 0; i < tags.length; i++) {
            var hasReplacement = false;           
            var tagRawReplaced = tags[i].raw;

            this.attributesToReplace.forEach((value, key)=> {
                if (tags[i].attributes.includes(key)) {
                    hasReplacement = true;
                    tagRawReplaced = tagRawReplaced.split(key).join(value);
                }
            });
            this.attributesToSetInTag.forEach((attrToSetInElement) => {
                if (tags[i].attributes.includes(attrToSetInElement.hasAttribute)) {
                    if (this.isInsideTag(attrToSetInElement.containerTag, i, tags)) {
                        hasReplacement = true;
                        tagRawReplaced = tagRawReplaced.split('<' + tags[i].name).join('<' + tags[i].name + ' ' + attrToSetInElement.attributeToSet);
                    }
                }
            });
            
            if (hasReplacement)
                tagsToReplace.set(tags[i].raw, tagRawReplaced);
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
                        this.vars = {};
                    }
                }
            );
            const tmpModule = NgModule({declarations: [tmpCmp], imports: [AppCustomModule], schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]})(class {});
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
            const tmpModule = NgModule({declarations: [tmpCmp], imports: [AppCustomModule], schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]})(contextClass);
            this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'dynamic';
                viewChild.remove(0);
                viewChild.insert(cmpRef.hostView);
            });
    }

    parseJsonToUrlParameters(json: any) {
        let parameters:string = "";
        for (var attr in json) {
            parameters += attr + "=" + json[attr] + "&";
        }
        return parameters;
    }
}
