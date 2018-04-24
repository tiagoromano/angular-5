import {Injectable, Component, NgModule, Compiler, Injector, NgModuleRef, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { ngModuleJitUrl } from "@angular/compiler";
import { AppCustomModule } from "../../app/app.custom.module";
import { BaseComponent } from "../../common/base-component.component";


@Injectable()
export class ComponentServiceProvider {

    readonly SET_IN_TAG: string = "setInTag";
    readonly ANGULAR_SET_FROM_ATTR: string = "angularFromAttr";
    readonly MODIFY_SINTAX: string = "modifySintax";
    readonly COPY_ATTR_TO_ANOTHER: string = "copyAttrToAnother"
    private attributesToReplace : Map<string, string> = new Map<string, string>();
    private complexAttributes : any = [];


    constructor( private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>, private translateService: TranslateService) {
        this.fillAttributes();
    }


    private fillAttributes() {
        this.attributesToReplace.set("ng-model", "[(ngModel)]");
        this.attributesToReplace.set("ng-submit", "(ngSubmit)");
        this.attributesToReplace.set("ng-src", "src");
        this.attributesToReplace.set("aria-label", "attr.aria-label");
        this.attributesToReplace.set("ng-hide", "[hidden]");
        this.attributesToReplace.set("ng-click", "(click)");
        this.attributesToReplace.set("on-error", "onError");
        this.attributesToReplace.set("on-after-fill", "onAfterFill");
        this.attributesToReplace.set("on-before-create", "onBeforeCreate");
        this.attributesToReplace.set("on-after-create", "onAfterCreate");
        this.attributesToReplace.set("on-before-update", "onBeforeUpdate");
        this.attributesToReplace.set("on-after-update", "onAfterUpdate");
        this.attributesToReplace.set("on-before-delete", "onBeforeDelete");
        this.attributesToReplace.set("on-after-delete", "onAfterDelete");

        //Atributos que devem ser setados nas tags (elementos)
        //Irá inserir nos elementos que estejam dentro do "containerTag", o valor do "attributeToSet", desde que o elemento contenha o atributo setado
        //no "hasAttribute", caso o "containerTag" seja vazio, será setado o "attributeToSet" em todos os elementos que contenham o "hasAttribute"
        this.complexAttributes.push( {type: this.SET_IN_TAG, containerTag: "form", hasAttribute: "ng-model", attributeToSet:"[ngModelOptions]=\"{standalone:true}\"" } );

        //Caso necessite inserir um atributo a uma tag especifica informar o nome deste em tag, o valor em attributeToSet e o type = this.SET_IN_TAG
        this.complexAttributes.push( {type: this.SET_IN_TAG, tag: "form", attributeToSet:"ngNativeValidate" } );

        //Fazer copia de atributo para outro atributo
        this.complexAttributes.push( {type: this.COPY_ATTR_TO_ANOTHER, attributes: ["ng-model", "[(ngModel)]"], toAnotherAttr: "ngmodelname" } );


        //Expressões angular que devem ser substituidas por valores que estejam em determinado atributo.
        this.complexAttributes.push( {type: this.ANGULAR_SET_FROM_ATTR, angularExpression: "datasource", replaceByContentOfNearestAttribute: "crn-datasource"} );

        //Atributos que devem ter a sintaxe do conteudo modificada
        let sintaxReplace: Map<string, string> = new Map<string, string>();
        sintaxReplace.set("in", "of");
        this.complexAttributes.push( {type: this.MODIFY_SINTAX, attrOrign: "ng-repeat", attrDest: "*ngFor", addBeginExpression: "let ", sintaxReplace: sintaxReplace} );

        this.complexAttributes.push( {type: this.MODIFY_SINTAX, attrOrign: "ng-show", attrDest: "[hidden]", wrapContent: "!({content})"} );

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

    private getContentOfAttribute(rawHtml: string, attrName: string) {
        var idx = rawHtml.indexOf(attrName) + attrName.length;
        var contentAttr = "";
        var stopChar = "";
        var idxStpopChar = -1;
        while (idx <= rawHtml.length) {
            if (rawHtml[idx] == " " || rawHtml[idx] == "=")
                idx++;
            else if (rawHtml[idx] == "'" || rawHtml[idx] == '"') {
                stopChar = rawHtml[idx];
                idxStpopChar = idx;
                break;
            }
            else
                break;
        }
        if (idxStpopChar > -1) {
            if (rawHtml.length > idxStpopChar+1) {
                contentAttr = rawHtml.substr(idxStpopChar+1);
                var endIndex = contentAttr.indexOf(stopChar);
                contentAttr = contentAttr.substr(0, endIndex);
            }
        }
        return contentAttr;
    }

    private getNearestValueFromAttribute(angularExpression: string, attributeToSearch: string, idxTag: number, tags:any) {
        var valueFromAttr = "";
        //Verificar se o valor está dentro de algum atributo na froma de expressão (com .)
        var isInsideInSomeAttribute = false;
        tags[idxTag].attributes.forEach(attr => {
            var contentAttr = this.getContentOfAttribute(tags[idxTag].raw, attr);
            if (contentAttr.indexOf(angularExpression) > -1)
                isInsideInSomeAttribute = true;
        });

        //Se estiver dentro de algum atributo, verifica qual o conteudo do atributo e retonra
        if (isInsideInSomeAttribute) {
            idxTag--;
            while (idxTag > -1) {
                if (tags[idxTag].attributes.includes("crn-datasource"))
                    return this.getContentOfAttribute(tags[idxTag].raw, "crn-datasource")
                idxTag--;
            }
        }
        return "";
    }

    private parseAttributesAngular5(viewContent: string) {
        var tags = this.getTagsHtml(viewContent);
        // let tagsToReplace: Map<string, string> = new Map<string, string>();
        let tagsToReplace: any = [];

        for (var i = 0; i < tags.length; i++) {
            var hasReplacement = false;
            var tagRawReplaced = tags[i].raw;

            this.attributesToReplace.forEach((value, key)=> {
                if (tags[i].attributes.includes(key)) {
                    hasReplacement = true;
                    tagRawReplaced = tagRawReplaced.split(key).join(value);
                }
            });
            this.complexAttributes.forEach((cpxAttr) => {
                if (cpxAttr.type == this.SET_IN_TAG) {
                    if ((cpxAttr.tag) && (tags[i].name == cpxAttr.tag)) {
                        hasReplacement = true;
                        tagRawReplaced = tagRawReplaced.split('<' + tags[i].name).join('<' + tags[i].name + ' ' + cpxAttr.attributeToSet);
                    } else if (tags[i].attributes.includes(cpxAttr.hasAttribute)) {
                        if (this.isInsideTag(cpxAttr.containerTag, i, tags)) {
                            hasReplacement = true;
                            tagRawReplaced = tagRawReplaced.split('<' + tags[i].name).join('<' + tags[i].name + ' ' + cpxAttr.attributeToSet);
                        }
                    }
                }
                else if (cpxAttr.type == this.ANGULAR_SET_FROM_ATTR) {
                    if (tagRawReplaced.indexOf(cpxAttr.angularExpression+".") > -1) {
                        var newAngularValue = this.getNearestValueFromAttribute(cpxAttr.angularExpression+"." ,cpxAttr.replaceByContentOfNearestAttribute, i, tags);
                        if (newAngularValue.length > 0) {
                            hasReplacement = true;
                            tagRawReplaced = tagRawReplaced.split(cpxAttr.angularExpression + ".").join(newAngularValue + ".");
                        }
                    }
                }
                else if (cpxAttr.type == this.MODIFY_SINTAX) {
                    if (tags[i].attributes.includes(cpxAttr.attrOrign)) {

                        var contentOfAttribute = this.getContentOfAttribute(tagRawReplaced, cpxAttr.attrOrign);
                        var contentOfAttributeSintaxReplaced = contentOfAttribute;

                        if (cpxAttr.sintaxReplace) {
                            cpxAttr.sintaxReplace.forEach((value, key) => {
                                contentOfAttributeSintaxReplaced = contentOfAttributeSintaxReplaced.split(key).join(value);
                            });
                        }
                        if (cpxAttr.addBeginExpression)
                            contentOfAttributeSintaxReplaced =  cpxAttr.addBeginExpression + contentOfAttributeSintaxReplaced;
                        if (cpxAttr.wrapContent)
                            contentOfAttributeSintaxReplaced =  cpxAttr.wrapContent.split("{content}").join(contentOfAttributeSintaxReplaced);
                        tagRawReplaced = tagRawReplaced.split(contentOfAttribute).join(contentOfAttributeSintaxReplaced);
                        tagRawReplaced = tagRawReplaced.split(cpxAttr.attrOrign).join(cpxAttr.attrDest);
                        hasReplacement = true;
                    }
                }
                else if (cpxAttr.type == this.COPY_ATTR_TO_ANOTHER) {
                    cpxAttr.attributes.forEach(attr => {
                        if (tags[i].attributes.includes(attr)) {
                          var contentAttr = this.getContentOfAttribute(tags[i].raw, attr);
                          tagRawReplaced = tagRawReplaced.split('<' + tags[i].name).join('<' + tags[i].name + ' ' + cpxAttr.toAnotherAttr + ' = "' + contentAttr + '"');
                          hasReplacement = true;
                        }
                    });
                }
            });

            if (hasReplacement)
                tagsToReplace.push({ key: tags[i].raw, value: tagRawReplaced});
        }
        tagsToReplace.forEach((replacement) => {
            var indexOfKey = viewContent.indexOf(replacement.key);
            var lengthKey = replacement.key.length;
            var leftContent = viewContent.substr(0, indexOfKey);
            var rightContent = viewContent.substr(indexOfKey + lengthKey);
            viewContent = leftContent + replacement.value + rightContent;
        });
        return viewContent;
    }

    private uniqueId() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    createDynamicComponent(viewChild: any, viewContent:any) {
        
        viewContent = this.parseAttributesAngular5(viewContent);
        
        var contextClass = class extends BaseComponent {
            initialize(): void {
            }
        }

        const tmpCmp = Component({
            moduleId: this.uniqueId(),
            template: viewContent
            })
            (
                contextClass
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
        viewContent = this.parseAttributesAngular5(viewContent);
        const tmpCmp = Component({
                moduleId: this.uniqueId(),
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

}
