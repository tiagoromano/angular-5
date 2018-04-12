import { Directive, ElementRef, Input, HostListener, OnInit, ViewContainerRef, Component, Output, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';

@Directive({
  selector: '[crn-datasource]',
//   exportAs: 'crn-datasource'
})

// @Component({
//     selector: '[crn-datasource]',
//     template: "<ng-container #datasource></ng-container>",
// })

export class CrnDatasourceDirective implements OnInit {

    /*
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
          scope.data = DatasetManager.datasets;
          if (scope.data[attrs.crnDatasource]) {
            scope.datasource = scope.data[attrs.crnDatasource];
          } else {
            scope.datasource = {};
            scope.datasource.data = $parse(attrs.crnDatasource)(scope);
          }
          scope.$on('$destroy', function() {
            delete $rootScope[attrs.crnDatasource];
          });
        }
      };
    */ 
    public datasource: any;
    @Input('crn-datasource') datasourceName: any;

    constructor(private el: ElementRef,  private translate: TranslateService, public viewContainerRef: ViewContainerRef, private datasourceFactory: DatasourceManagerProvider) { 
        debugger;
    }


    ngBeforeInit() {

    }

    ngOnInit(): void {
        debugger;
        //var my = this.el.nativeElement;
        //var allDatasets = this.datasourceFactory.getAllDataset();
        //this.datasource = allDatasets[this.datasourceName];
        this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.split('datasource.').join(this.datasourceName+'.');
    }

}