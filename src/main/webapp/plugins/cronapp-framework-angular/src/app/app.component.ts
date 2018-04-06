import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<div>
                <!-- <router-outlet></router-outlet> -->
                <ui-view></ui-view>
              </div>`
})
export class AppComponent {
  title = 'app';

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
