import {ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';
//--------firebase------------------------
import * as firebase from 'firebase';
import QuerySnapshot from 'firebase/firestore';
//-------------services---------------------
import {GisService} from './services/Gis.service';
import { FireStoreService } from './services/firebase-cloud-firestore/firestore.service';
//-----------------firebase types-------------------------

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.Emulated,
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit{

  public map2Gis : any;
  public formVisibility = false;
  public auth : firebase.auth.Auth;
  
  public onLine  = false;
  

  constructor(private gisService : GisService, private changeDet : ChangeDetectorRef, @Inject(DOCUMENT) private document : any, public fireStoreService : FireStoreService, public http : HttpClient){
     this.auth  = fireStoreService.fireAuth().auth;
    this.onLine = this.document.defaultView.navigator.onLine;
    
  }

  ngAfterViewInit(){
    let that = this;
        this.gisService.startMap(this);//запуск сервиса генерации карты
    this.auth.onAuthStateChanged(user => {
      if(true /*user*/){//загрузка данных
        that.formVisibility = false;
        that.fireStoreService.getCollection('messages').then((res)=>{
          debugger;
        }).catch((err)=>{
          debugger;
        });
       
      }
      else{ //отображение формы аутентификации
        //that.formVisibility = false ;//true;
      }
      that.changeDet.detectChanges();
    })

  }
  setDocument(){
    this.http.get('https://us-central1-gis-message-1cc7b.cloudfunctions.net/app/messageDate-21-06-17.json', {responseType: 'text', headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'https://us-central1-gis-message-1cc7b.cloudfunctions.net')}).subscribe(data => {
          console.log(data) ;
        });
  }
}
