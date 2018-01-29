import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
//-----------------material---------------------------------------------
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIconModule} from '@angular/material';
//----------------components----------------------------------
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthenticationFormComponent } from './components/aunthentication-form/authentication-form.component';
import { SvgMessageFilterComponent } from './components/svg-message-filter/svg-message-filter.component';
import { ChartTypeComponent } from "./components/chart-types/chart-type.component";
//-----------services-------------------------------------------
import { GisService } from './services/Gis.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationFormComponent,
    SvgMessageFilterComponent,
    ChartTypeComponent,
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
    MatAutocompleteModule,
    MatIconModule,
  ],
  providers: [
    GisService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
