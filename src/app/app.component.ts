import {ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
//-------------services---------------------
import { FireBaseService } from "./services/firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.Emulated,
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit{
  
  public db : any;
  public messages : any;
  public map2Gis : any;
  public onLine  = false;
  public authUser : string;
  
  constructor(private changeDet : ChangeDetectorRef, public fireBaseService : FireBaseService,  @Inject(DOCUMENT) private document : any){
    
    this.onLine = this.document.defaultView.navigator.onLine;
    this.db = this.fireBaseService.db;
    }

  ngAfterViewInit(){
      this.fireBaseService.auth.onAuthStateChanged(user => {
        user ? (this.authUser = (user && user.displayName) || 'Пользователь приложения') : (this.authUser = 'not authorised');
        this.changeDet.detectChanges();
    })
  }
}
