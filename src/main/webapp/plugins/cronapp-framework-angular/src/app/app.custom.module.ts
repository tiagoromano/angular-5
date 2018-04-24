import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { CommonVariableProvider } from '../providers/common-variable/common-variable';
import { DatasourceManagerProvider } from '../providers/datasource-manager/datasource-manager';
import { ValidDirective } from '../directives/valid/valid.directive';
import { CronValidDirective } from '../directives/valid/cron-valid.directive';
import { DatasourceDirective } from '../directives/datasource/datasource.directive';
import { MaskDateDirective } from '../directives/mask/mask-date.directive';
import { CronMaskDateDirective } from '../directives/mask/cron-mask-date.directive';
import { CronappSecurityDirective } from '../directives/cronapp-security/cronapp-security.directive';
import { CronSecurityDirective } from '../directives/cronapp-security/cron-security.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../i18n/locale_', '.json');
}

@NgModule({
    declarations: [
        DatasourceDirective,
        CronappSecurityDirective,
        CronSecurityDirective,
        ValidDirective,
        CronValidDirective,
        MaskDateDirective,
        CronMaskDateDirective
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
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [
        TranslateModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        DatasourceDirective,
        CronappSecurityDirective,
        CronSecurityDirective,
        ValidDirective,
        CronValidDirective,
        MaskDateDirective,
        CronMaskDateDirective
    ],
    providers: [

    ],
    bootstrap: [],
})

export class AppCustomModule {

}

