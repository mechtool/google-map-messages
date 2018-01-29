import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector : 'chart-type',
  styleUrls : ['./chart-type.component.css'],
  templateUrl : './chart-type.component.html',
})
export class ChartTypeComponent{
  
  form : FormGroup;
  typeCtrl : FormControl;
  filteredChartTypes : Observable<any[]>;
  @Output() onClickClose : EventEmitter<void> = new EventEmitter<void>();
  @Output() public onSelectedType : EventEmitter<string> = new EventEmitter<string>();
  chartTypes : any[] = [
    {name : 'Столбчатый', img : '/assets/chart-bar.png' },
    {name : 'Полигональный', img : '/assets/chart-areaspline.png' },
  
  ] ;
  
  constructor(){
    this.typeCtrl = new FormControl('Столбчатый');
    this.form = new FormGroup ({
      typeCtrl : this.typeCtrl
    });
    this.filteredChartTypes = this.typeCtrl.valueChanges
                              .startWith(null)
                              .map(() =>  this.chartTypes.slice());
  }
  onSelected($event){
    this.onSelectedType.emit($event.option.value) ;
    
  }
  onClickCross(){
    this.onClickClose.emit() ;
  }
  
/*  filterTypes(enter: string) {
    return this.chartTypes.filter(type =>
      type.name.toLowerCase().indexOf(enter.toLowerCase()) === 0);
  }*/
}
