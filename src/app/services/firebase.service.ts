import { Injectable } from "@angular/core";
import {environment} from "../../environments/environment";
import * as firebase from "firebase";

@Injectable()
export class FireBaseService{
    
    public db : any;
    public auth : any;
    public fireBase : any;
    public googleProvider = firebase.auth.GoogleAuthProvider;
    
    constructor(){
        this.fireBase = firebase;
        this.db = this.startFireBase();
        this.auth = firebase.auth();
    }
    
    private startFireBase(){
      firebase.initializeApp(environment.fireBaseConfig);
      return firebase.database();
    }
    getDataServer(appThis : any){
      let that = this;
      return new Promise((res, rej) => {
        that.db.ref('messages').orderByChild('dateNumber').on('value', (querySnapshot) => {
          appThis.messages = querySnapshot.val();
          res();
        })
      });
    }

}
