import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

    constructor(private el: ElementRef,  private translate: TranslateService) { 
        
        
    }

    ngOnInit(): void {
        debugger;
        var props = {
            name: this.name,
            entity: this.entity,
            apiVersion: this.apiVersion,
            enabled: (this.enabled === "true" ||  !this.enabled) ? true: false,
            keys: this.keys,
            endpoint: this.endpoint,
            lazy: (this.lazy === "" || this.lazy === "true"),
            append: (this.append === "true" || !this.append),
            prepend: (this.prepend === "true" || this.prepend === "" || !this.prepend),
            watch: this.watch,
            rowsPerPage: this.rowsPerPage,
            offset: this.offset,
            filterURL: this.filter,
            watchFilter: this.watchFilter,
            deleteMessage: this.deleteMessage || this.deleteMessage === "" ? this.deleteMessage : this.translate.instant('General.RemoveData'),
            headers: this.headers,
            autoPost: (this.autoPost === "" || this.autoPost === "true"),
            onError: this.onError,
            onAfterFill: this.onAfterFill,
            onBeforeCreate: this.onBeforeCreate,
            onAfterCreate: this.onAfterCreate,
            onBeforeUpdate: this.onBeforeUpdate,
            onAfterUpdate: this.onAfterUpdate,
            onBeforeDelete: this.onBeforeDelete,
            onAfterDelete: this.onAfterDelete,
            defaultNotSpecifiedErrorMessage: this.translate.instant('General.ErrorNotSpecified'),
            dependentBy: this.dependentBy,
            dependentLazyPost: this.dependentLazyPost, 
            dependentLazyPostField: this.dependentLazyPostField, 
          };

          var firstLoad = {
            filter: true,
            entity: true,
            enabled: true
          };

    }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = this.entity;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = null;
    }
}