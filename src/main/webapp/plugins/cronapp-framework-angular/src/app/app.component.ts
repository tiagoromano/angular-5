import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, translate: TranslateService) {
    debugger;
    translate.setDefaultLang('pt_br');
    let locale = navigator.language || 'pt_br';
    translate.use(locale);

  }
  
  ngOnInit() {
    // this.router.navigate(['/home']);
  }
}
