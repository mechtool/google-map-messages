import {ApplicationRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//----------services---------------------
import { FireBaseService } from "../../services/firebase.service";
import { CommunicationService } from "../../services/communication.service";
import { shakeFormTrigger } from "../../services/animations";
import {MatRadioGroup} from "@angular/material";

@Component({
  selector : 'mes-authentication-form',
  styleUrls : ['./authentication-form.component.css'],
  templateUrl : './authentication-form.component.html',
  animations : [
     shakeFormTrigger,
  ]
})
export class AuthenticationFormComponent implements OnChanges{
  
  public radioValue ;
  public formVisibility = true;
  public formType = 'authGroup';
  public triggerShakeForm = 'stop';
  public formGroups : {[name : string] : FormGroup} ;
  public formHeaders = {authGroup : 'Для демонстрации реализации различных способов аутентификации, котрые предоставляет Firebase, эта форма предлагает аутентифицироваться в приложение через:',
    emailGroup : 'Аутентификация посредством email и password.',
    userGroup : 'Вход выполнен.',
  };
  @Input() public authUser : string;


  constructor(public fb : FormBuilder, public fireBaseService : FireBaseService, public appRef : ApplicationRef, public communicationService : CommunicationService){
    this.formGroups = { //группа форм для различной аутентификации
        authGroup : this.fb.group({
          authValue : '',
      }),
        emailGroup : this.fb.group( {
          email : ['', [Validators.email, Validators.required]],
          password : ['', Validators.required]
      }),
      userGroup : this.fb.group({})
    }
  }
  
  ngOnChanges(changes : SimpleChanges){
    
    let val = changes['authUser'].currentValue;
      if(val && val != 'not authorised'){
          let that = this;
          this.formType ='userGroup';
          this.fireBaseService.getDataServer(this.appRef.components["0"].instance).then(() => {
              that.appRef.components["0"].instance.changeDet.detectChanges();
          });
      }
  }
  
  giveErrorMessage(error){
    var errorCode = error.code,
      errorMessage = error.message,
      codes = ['auth/operation-not-allowed', 'auth/invalid-email', 'auth/email-already-in-use', 'auth/user-not-found'];
    // [START_EXCLUDE]
    if ( codes.some((code) => {
        return errorCode == code;
      })) {
      alert(errorMessage);
    } else if (errorCode === 'auth/wrong-password') {
      alert('Неверный пароль.');
    }else if (errorCode == 'auth/weak-password') {
      alert('Слишком слабый пароль.');
    }
  }
  
  onClickRadio(){
    
    let that = this;
    if(this.radioValue == 'emailGroup'){
      this.formType = this.radioValue;
    }
    else{
         if(this.radioValue == 'anonymousGroup'){
            this.fireBaseService.auth.signInAnonymously()
              .then(()=>{
                that.formType = 'userGroup';
              })
              .catch(function(error) {
                  console.log(error);
                  that.giveErrorMessage(error);
     })
   }else if(this.radioValue =='googleGroup'){
           var provider = new this.fireBaseService.googleProvider();
           provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
     this.fireBaseService.auth.signInWithPopup(provider)
       .then(()=>{
         that.formType = 'userGroup';
       })
       .catch(function(error) {
              console.log(error);
              that.giveErrorMessage(error);
          })
        }
    }
  }
  
  onBack($event){
    this.formType = 'authGroup';
    $event.stopImmediatePropagation();
  }
  
  onClickUserGroup($event){
    let target = $event.currentTarget;
    if(target.classList.contains('exitButton')){//выход из приложения и смена диалога и отчистка данных
        this.fireBaseService.auth.signOut();
        this.formType = 'authGroup';
        this.communicationService.communicationSource.next('delete');
    }
    else if(target.classList.contains('fartherButton')){
      this.formVisibility = false;
    }
    $event.preventDefault();
  }
  
  animationEnd(){
    this.triggerShakeForm = 'stop';
  }
  
  onClickEmailGroup($event){
    
    let that = this,
        target = $event.currentTarget,
        reg = target.classList.contains('registrationButton');
        if(reg || target.classList.contains('enterButton')){
            if(this.formGroups.emailGroup.invalid){
              this.triggerShakeForm = 'start';
              return;
            }
            let email = this.formGroups.emailGroup.controls['email'].value,
                pass = this.formGroups.emailGroup.controls['password'].value;
            
            if(reg){//создание пользователя с email  и password
              this.fireBaseService.auth.createUserWithEmailAndPassword(email, pass).catch((error) => {
                that.giveErrorMessage(error) ;

              });
            }else{//вход пользователя с email и password
              this.fireBaseService.auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
                    that.giveErrorMessage(error);
})
          }
        }
        else if(target.classList.contains('repairButton')){ //отправка востановление пароля по email
          if(this.formGroups.emailGroup.controls['email'].invalid){
            this.triggerShakeForm = 'start';
            return
          }
          this.fireBaseService.auth.sendPasswordResetEmail(this.formGroups.emailGroup.controls['email'].value).then(function() {
            alert('Запрос на переустановку пароля отправлен');
          })
            .catch(function(error) {
              console.log(error);
              that.giveErrorMessage(error);
            });
        }
        
      }
}
