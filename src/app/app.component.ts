import {ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';
//--------firebase------------------------
import * as firebase from 'firebase';
require("firebase/firestore");
//-------------services---------------------
//-----------------firebase types-------------------------

import {environment} from "../environments/environment";

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
  public onLine  = false;
  public db : any;
  public messages : any;
  

  constructor(private changeDet : ChangeDetectorRef,
              @Inject(DOCUMENT) private document : any,
              public http : HttpClient){
     
    this.onLine = this.document.defaultView.navigator.onLine;
    firebase.initializeApp(environment.fireBaseConfig);
    this.db = firebase.database();
    }

  ngAfterViewInit(){
    let that = this;
      firebase.auth().onAuthStateChanged(user => {
      if(true/*user*/){//загрузка данных
        that.formVisibility = false;
        that.db.ref('messages').orderByChild('dateNumber').on('value', (querySnapshot) => {
             that.messages = querySnapshot.val();
             that.changeDet.detectChanges();
        })}
      else{
       /* that.formVisibility = true ;*/
      }
      that.changeDet.detectChanges();
    })
  }
  setDocument(){
    this.http.get('https://us-central1-gis-message-bdccb.cloudfunctions.net/app/messageDate-21-06-17.json', {responseType: 'text', headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')}).subscribe(data => {
          console.log(data) ;
        });
  }
  setOne(){
    let newOne = {
        body: "Новое значение",
        center: 1,
        date: "01.08.2013",
        dateNumber: 1375315200000,
        id: "5770f18dec2c5aec10d81a0new",
        lat: "55.7542645",
        long: "37.62019157",
        name: "Aleksey S."
    };
  
    this.db.ref('messages').child(newOne.id).set(newOne);
  }
}
