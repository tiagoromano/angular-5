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
import { MaskDateDirective } from '../directives/date/mask-date.directive';
import { MaskTextDirective } from '../directives/text/mask.directive';
import { CronMaskTextDirective } from '../directives/text/cron-mask.directive';
import { CronMaskDateDirective } from '../directives/date/cron-mask-date.directive';
import { CronappSecurityDirective } from '../directives/cronapp-security/cronapp-security.directive';
import { CronSecurityDirective } from '../directives/cronapp-security/cron-security.directive';
import { UiSelectComponent } from '../directives/select/ui-select.component';
import { CronSelectComponent } from '../directives/select/cron-select.component';
import { QrCodeDirective } from '../directives/qr-code/qrcode.directive';
import { CronQrCodeDirective } from '../directives/qr-code/cron-qrcode.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelephonePipe } from '../filters/telephone';
import { CepPipe } from '../filters/cep';
import { CnpjPipe } from '../filters/cnpj';
import { MaskPipe } from '../filters/mask';

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
        MaskTextDirective,
        CronMaskDateDirective,
        QrCodeDirective,
        UiSelectComponent,
        CronSelectComponent,
        TelephonePipe,
        CepPipe,
        CnpjPipe,
        MaskPipe
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
        MaskTextDirective,
        CronMaskDateDirective,
        QrCodeDirective,
        UiSelectComponent,
        CronSelectComponent,
        TelephonePipe,
        CepPipe,
        CnpjPipe,
        MaskPipe        
    ],
    providers: [],
    bootstrap: []
})

export class AppCustomModule {

}

