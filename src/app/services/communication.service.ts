import { Injectable } from "@angular/core";
import {Subject} from "rxjs/Subject";
@Injectable()
export class CommunicationService{
  public communicationSource = new Subject<string>();
  public communicationTarget = this.communicationSource.asObservable();
}
