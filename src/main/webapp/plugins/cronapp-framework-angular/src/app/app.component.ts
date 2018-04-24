import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
          <div>
            <simple-notifications></simple-notifications>        
            <ui-view></ui-view>                
          </div>`
})
export class AppComponent {
  title = 'app';

  constructor(translate: TranslateService) {
    
    translate.addLangs(["pt_br", "en_us"]);
    translate.setDefaultLang('pt_br');
    let locale = navigator.language || 'pt_br';
    locale = locale.replace('-','_').toLowerCase();
    
    translate.use(locale);

  }
  
  ngOnInit() {

  }
}
