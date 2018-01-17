import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

//-----------------material---------------------------------------------
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatRadioModule, MatFormFieldModule, MatInputModule} from '@angular/material';
//----------------components----------------------------------
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthenticationFormComponent } from './componenrs/aunthentication-form/authentication-form.component';
import { SvgMessageFilterComponent } from './componenrs/svg-message-filter/svg-message-filter.component';
//-----------services-------------------------------------------
import { GisService } from './services/Gis.service';
import { FireStoreService } from './services/firebase-cloud-firestore/firestore.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationFormComponent,
    SvgMessageFilterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [] ,
    //--------material modules----------------------
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    GisService,
    FireStoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
