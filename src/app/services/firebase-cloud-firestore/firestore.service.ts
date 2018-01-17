import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
require("firebase/firestore");
import {environment} from '../../../environments/environment';
@Injectable()
export class FireStoreService{
  
  public db : firebase.firestore.Firestore;
  
  constructor(){
    firebase.initializeApp(environment.fireBaseConfig);
    this.db = firebase.firestore();
  }
  
  fireStore(){
    let db = this.db;
    return {
      getCollection(url){
        db.collection(url).get().then((res)=>{
          debugger;
        }).catch((err)=>{
          debugger;
        });
      }
    }
  }
  
  getCollection(url){
    return this.db.collection(url).get();
  }
  
  fireAuth(){
    return {
      get auth() : firebase.auth.Auth{ return firebase.auth()}
    }
  }


}
