import { TranslateService } from "@ngx-translate/core";

export function parseMaskType(type, translate: TranslateService) {
    if (type == "datetime" || type == "datetime-local") {
        type = translate.instant('Format.DateTime');
        if (type == 'Format.DateTime') {
            type = 'DD/MM/YYYY HH:mm:ss'
        }
    } else if (type == "date") {
        type = translate.instant('Format.Date');
        if (type == 'Format.Date') {
            type = 'DD/MM/YYYY'
        }
    } else if (type == "time" || type == "time-local") {
        type = translate.instant('Format.Hour');
        if (type == 'Format.Hour') {
            type = 'HH:mm:ss'
        }
    } else if (type == "month") {
        type = 'MMMM';
    } else if (type == "number") {
        type = translate.instant('Format.Decimal');
        if (type == 'Format.Decimal') {
            type = '0,00'
        }
    } else if (type == "money") {
        type = translate.instant('Format.Money');
        if (type == 'Format.Money') {
            type = '#.#00,00'
        }
    } else if (type == "integer") {
        type = '0';
    } else if (type == "week") {
        type = 'dddd';
    } else if (type == "tel") {
        type = '(00) 00000-0000;0';
    } else if (type == "text") {
        type = '';
    }
    
    return type;
}
