// import { NewComponentComponent } from './new-component/new-component.component';  
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatasourceDirective } from './datasource.directive';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';
import { CronappSecurityDirective } from './cronapp-security.directive';
import { ValidDirective } from './valid.directive';
import { AsDateDirective } from './as-date.directive';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ImportClass } from './common/importClass.component';


// import {Component, VERSION, ComponentFactoryResolver, InjectionToken,Injector, ElementRef, Output, Input, EventEmitter, 
//         ComponentFactory, ComponentRef} from '@angular/core';
// import {FormControl, ReactiveFormsModule} from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../i18n/locale_', '.json');
}

@NgModule({
    declarations: [
        DatasourceDirective,
        CronappSecurityDirective,
        ValidDirective,
        AsDateDirective
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        BrowserModule
    ],
    exports: [
        TranslateModule,
        FormsModule,
        BrowserModule,
        DatasourceDirective,
        CronappSecurityDirective,
        ValidDirective,
        AsDateDirective
    ],
    providers: [
        // HelperServiceProvider,
        // CommonVariableProvider,
        // DatasourceManagerProvider
    ],
    bootstrap: [],
})

export class AppCustomModule {

}

  