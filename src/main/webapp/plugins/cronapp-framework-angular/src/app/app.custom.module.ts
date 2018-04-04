// import { NewComponentComponent } from './new-component/new-component.component';  
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { ImportClass } from './common/importClass.component';


// import {Component, VERSION, ComponentFactoryResolver, InjectionToken,Injector, ElementRef, Output, Input, EventEmitter, 
//         ComponentFactory, ComponentRef} from '@angular/core';
// import {FormControl, ReactiveFormsModule} from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../i18n/locale_', '.json');
}

@NgModule({
    declarations: [
        // ImportClass
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
        BrowserModule
    ],
    providers: [],
    bootstrap: []
})

export class AppCustomModule {

}

  