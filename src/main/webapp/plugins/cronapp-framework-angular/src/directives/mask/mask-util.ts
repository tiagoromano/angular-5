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

export function buildOptions(mask, translate) {
    const options = {
        format: mask,
        locale: translate.currentLang,
        showTodayButton: true,
        useStrict: true,
        sideBySide: false,
        tooltips: {
            today: translate.instant('DatePicker.today'),
            clear: translate.instant('DatePicker.clear'),
            close: translate.instant('DatePicker.close'),
            selectMonth: translate.instant('DatePicker.selectMonth'),
            prevMonth: translate.instant('DatePicker.prevMonth'),
            nextMonth: translate.instant('DatePicker.nextMonth'),
            selectYear: translate.instant('DatePicker.selectYear'),
            prevYear: translate.instant('DatePicker.prevYear'),
            nextYear: translate.instant('DatePicker.nextYear'),
            selectDecade: translate.instant('DatePicker.selectDecade'),
            prevDecade: translate.instant('DatePicker.prevDecade'),
            nextDecade: translate.instant('DatePicker.nextDecade'),
            prevCentury: translate.instant('DatePicker.prevCentury'),
            nextCentury: translate.instant('DatePicker.nextCentury')
        }
    };

    if (mask != 'DD/MM/YYYY' && mask != 'MM/DD/YYYY') {
        options.sideBySide = true;
    }

    return options;
}
