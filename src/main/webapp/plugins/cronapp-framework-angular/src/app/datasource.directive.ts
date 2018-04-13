import { Directive, ElementRef, Input, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';

@Directive({
  selector: 'datasource',
})
export class DatasourceDirective implements OnInit {

    @Input() entity: string;
    @Input() name: string;
    @Input() apiVersion: string;
    @Input() enabled: string;
    @Input() keys: string;
    @Input() endpoint: string;
    @Input() lazy: string;
    @Input() append: string;
    @Input() prepend: string;
    @Input() watch: string;
    @Input() rowsPerPage: string;
    @Input() offset: string;
    @Input() filter: string;
    @Input() watchFilter: string;
    @Input() deleteMessage: string;
    @Input() headers: string;
    @Input() autoPost: string;
    @Input() onError: string;
    @Input() onAfterFill: string;
    @Input() onBeforeCreate: string;
    @Input() onAfterCreate: string;
    @Input() onBeforeUpdate: string;
    @Input() onAfterUpdate: string;
    @Input() onBeforeDelete: string;
    @Input() onAfterDelete: string;
    @Input() dependentBy: string;
    @Input() dependentLazyPost: string;
    @Input() dependentLazyPostField: string;

    constructor(private el: ElementRef,  private translate: TranslateService, public viewContainerRef: ViewContainerRef, private datasourceFactory: DatasourceManagerProvider) { 
        var moduleId = this.viewContainerRef["_view"].context.constructor.__annotations__[0].moduleId
        //TODO: Fazer um provider para o datasource, funcionar como o Factory no angular 1



    }

    getFromNativeElement(attr: string) {
        if (this.el.nativeElement.attributes[attr])
            return this.el.nativeElement.attributes[attr].value
        return undefined;
    }

    ngOnInit(): void {
        debugger;
        var myleft = this.el.nativeElement;
        var props = {
            name: this.name,
            entity: this.entity,
            apiVersion: this.apiVersion ? this.apiVersion : this.getFromNativeElement('api-version'),
            enabled: (this.enabled === "true" ||  !this.enabled) ? true: false,
            keys: this.keys,
            endpoint: this.endpoint,
            lazy: (this.lazy === "" || this.lazy === "true"),
            append: (this.append === "true" || !this.append),
            prepend: (this.prepend === "true" || this.prepend === "" || !this.prepend),
            watch: this.watch,
            rowsPerPage: this.rowsPerPage ? this.rowsPerPage : this.getFromNativeElement('rows-per-page'),
            offset: this.offset,
            filterURL: this.filter,
            watchFilter: this.watchFilter? this.watchFilter : this.getFromNativeElement('watch-filter'),
            deleteMessage: this.deleteMessage || this.deleteMessage === "" ? this.deleteMessage : (this.getFromNativeElement('delete-message') ? this.getFromNativeElement('delete-message') : this.translate.instant('General.RemoveData') ),
            headers: this.headers,
            autoPost: (this.autoPost === "" || this.autoPost === "true" || this.getFromNativeElement('auto-post') || this.getFromNativeElement('auto-post') == "true" ),
            onError: this.onError ? this.onError : this.getFromNativeElement('on-error'),
            onAfterFill: this.onAfterFill ? this.onAfterFill : this.getFromNativeElement('on-after-fill'),
            onBeforeCreate: this.onBeforeCreate ? this.onBeforeCreate : this.getFromNativeElement('on-before-create'),
            onAfterCreate: this.onAfterCreate ? this.onAfterCreate : this.getFromNativeElement('on-after-create'),
            onBeforeUpdate: this.onBeforeUpdate ? this.onBeforeUpdate : this.getFromNativeElement('on-before-update'),
            onAfterUpdate: this.onAfterUpdate ? this.onAfterUpdate : this.getFromNativeElement('on-after-update'),
            onBeforeDelete: this.onBeforeDelete ? this.onBeforeDelete : this.getFromNativeElement('on-before-delete'),
            onAfterDelete: this.onAfterDelete ? this.onAfterDelete : this.getFromNativeElement('on-after-delete'),
            defaultNotSpecifiedErrorMessage: this.translate.instant('General.ErrorNotSpecified'),
            dependentBy: this.dependentBy ? this.dependentBy : this.getFromNativeElement('dependent-by'),
            dependentLazyPost: this.dependentLazyPost ? this.dependentLazyPost : this.getFromNativeElement('dependent-lazy-post'), 
            dependentLazyPostField: this.dependentLazyPostField ? this.dependentLazyPostField : this.getFromNativeElement('dependent-lazy-post-field'),
        };

        var firstLoad = {
            filter: true,
            entity: true,
            enabled: true
        };

        var dts = this.datasourceFactory.initDataset(props, this.viewContainerRef["_view"].context);
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = this.entity;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = null;
    }
}