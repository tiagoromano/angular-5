import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<div>              
                <ui-view></ui-view>
              </div>`
})
export class AppComponent {
  constructor(/*private router: Router,*/ translate: TranslateService) {
    
    translate.addLangs(["pt_br", "en_us"]);
    translate.setDefaultLang('pt_br');
    let locale = navigator.language || 'pt_br';
    locale = locale.replace('-','_').toLowerCase();
    
    translate.use(locale);

  }
  
  ngOnInit() {
    // this.router.navigate(['/home']);
  }
}
