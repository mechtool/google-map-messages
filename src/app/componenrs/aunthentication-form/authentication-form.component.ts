import { Component, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector : 'mes-authentication-form',
  styleUrls : ['./authentication-form.component.css'],
  templateUrl : './authentication-form.component.html',
})
export class AuthenticationFormComponent{

  public formType = 'authGroup';
  public formGroups : any ;
  public formHeaders = {authGroup : 'Для демонстрации реализации различных способов аутентификации, котрые предоставляет Firebase, эта форма предлагает аутентифицироваться в приложение через:',
    emailGroup : 'Аутентификация посредством email и password.' };
  @Input() public formVisibility = true;


  constructor(public fb : FormBuilder){
    this.formGroups = { //группа форм для различной аутентификации
      authGroup : this.fb.group({
          authValue : '',
      }),
        emailGroup : this.fb.group( {
          email : ['', [Validators.email, Validators.required]],
          password : ['', Validators.required]
      })
    }
  }
    onClickRadio($event){
       this.formType = $event.value;
  }
}
