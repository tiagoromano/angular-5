// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';

// @Component({
//    selector: 'app-test-component',
//    templateUrl: './test-component.component.html'
// })
// export class TestComponentComponent { 
//   onFormSubmit(userForm: NgForm) {
//         console.log(userForm.value);
// 	      console.log('Name:' + userForm.controls['name'].value);
//         console.log('Form Valid:' + userForm.valid);
// 	      console.log('Form Submitted:' + userForm.submitted);
//   }
//   resetUserForm(userForm: NgForm) {
//         userForm.resetForm();;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  variavelRomano: any;
  variavelTiago: any;
  mercado0800link = "http://www.mercado0800.com.br/img/low_logo.png";

  constructor(translate: TranslateService) { 
    this.variavelRomano = {value: "romano"};
    this.variavelTiago = {value: "tiago"};
  }

  vai(variavelForm) {

    console.log(variavelForm);

    var ok = this.variavelRomano.value;
    ok = this.variavelTiago.value;
  }

  ngOnInit() {
  }

}
