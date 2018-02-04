import {
  Component, ElementRef, Inject, ChangeDetectorRef, Renderer2, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { flyInOutTrigger } from "../../services/animations";

import { DOCUMENT } from '@angular/common';
import { MessageRect, GisService } from "../../services/Gis.service";
import { CommunicationService} from "../../services/communication.service";

@Component({
  selector : 'mes-svg-message-filter',
  styleUrls : ['./svg-message-filter.component.css'],
  templateUrl : './svg-message-filter.component.html',
  animations : [
    flyInOutTrigger,
  ]
})
export class SvgMessageFilterComponent implements OnChanges{

  public rectHeight;
  public rectWidth;
  public rightDate;
  public leftDate;
  public activeType = false;
  public leftFilterStyle = 100;
  public rightFilterStyle = 100;
  public mainMessages : any = {};
  public switchGroup = 'Столбчатый';
  public rects : MessageRect[] = [];
  public innerData : any = {events : []};
  public polygons = [['0,50', '100,50'], ['0,50', '100,50']];

  @Input() public messages : any = {};
  @ViewChild ('chartContainer') public chartContainer : ElementRef;
  @ViewChildren('leftFilter, rightFilter') public filters : QueryList<any>;

  constructor(private elementRef : ElementRef, public changeRef : ChangeDetectorRef, @Inject(DOCUMENT) private documentRef : any, private renderer : Renderer2, public gisService : GisService, public communicationService : CommunicationService){
    this.gisService.startMap(this);//запуск сервиса генерации карты
    this.communicationService.communicationTarget.subscribe((type) => {
      if(type == 'delete'){
        this.rects = [];
        this.messages = {};
        this.polygons = [['0,50', '100,50'], ['0,50', '100,50']];
        this.gisService.deleteCircles();
      }
    })
  }

  ngOnChanges(changes : SimpleChanges){

    let that = this,
        maxDays = 0;
    if(changes.messages && changes.messages.currentValue){

      for(let key in changes.messages.currentValue){
          let pointArr,
              item = changes.messages.currentValue[key],
              point = this.mainMessages[item.dateNumber];
          if(point) {
            pointArr = point[item.center];
            if(!pointArr.some((p) => {
                  return p.id == item.id;
              })) pointArr.push(item);
          }
          else {
              let np = this.mainMessages[item.dateNumber] = {0 : [], 1 : []};
              pointArr = np[item.center];
              pointArr.push(item)
          }
        maxDays = Math.max(maxDays, pointArr.length);
      }
      processSvg();
    }

    function processSvg(){

      that.rectWidth = 100 / Object.keys(that.mainMessages).length;// ширина элемента данных  в %
      that.rectHeight = 50 / maxDays; //высота одного дня в элементе данных в %

      let allKeys = Object.keys(that.mainMessages);

      for(let key0 = 0; key0 < allKeys.length; key0++){
        let messObj = that.mainMessages[allKeys[key0]];
        for(let key1 = 0; key1 < 2 ; key1++){ //0 - 1
          let messArr = messObj[key1],
              fill = key1 ? '#1C00E2' : '#FFCB00',
              x = key0 * that.rectWidth,
              y = key1 ? 50 - messArr.length * that.rectHeight : 50,
              messRect = new MessageRect(x + '%' , y +'%' , fill, messArr, +allKeys[key0],true, key1);
          that.leftDate = Math.min(that.leftDate || 1e15, messRect.dateNumber);
          that.rightDate = Math.max(that.rightDate || 0, messRect.dateNumber);
          that.rects.push(messRect);
          that.polygons[key1].splice( that.polygons[key1].length - 1, 0, (x + that.rectWidth/2) +','+ (key1 ? y : y + that.rectHeight * messArr.length) );
        }
      }
      that.gisService.setCircles(that) ;
      that.changeRef.detectChanges();
    }
  }

  onClickButton(){
    this.activeType = !this.activeType;
  }

  onSelectedType(type){
     this.switchGroup = type;
  }

  onDownFilter($event){
    let that = this,
        target = $event.target,
        boundingRect = target.getBoundingClientRect(),
        leftFilter = target.classList.contains('leftFilter');
    that.innerData.diff = (leftFilter ? boundingRect.right - $event.clientX :  $event.clientX - boundingRect.left);
    that.innerData.events.push(that.renderer.listen(that.documentRef, 'mousemove', onMoveMouse));
    that.innerData.events.push(that.renderer.listen(that.documentRef,'mouseup',  onUpMouse));

    function onMoveMouse($event){
      let leftDate = 1e13, rightDate = 0,
          parentBounding = target.parentElement.getBoundingClientRect(),
          span = $event.clientX - parentBounding.left,
          left = parentBounding.width - (span + that.innerData.diff),
          right = span - that.innerData.diff,
          filters = that.filters.toArray();
      leftFilter ? that.leftFilterStyle = (left  <= (parentBounding.width - filters[1].nativeElement.offsetLeft) ? parentBounding.width - filters[1].nativeElement.offsetLeft - 1 : left >= parentBounding.width ? parentBounding.width :  left) * 100 / parentBounding.width : that.rightFilterStyle = (right <= filters[0].nativeElement.offsetLeft + parentBounding.width ? filters[0].nativeElement.offsetLeft + parentBounding.width : right >= parentBounding.width ? parentBounding.width : right) * 100 / parentBounding.width;

      that.rects.forEach(rect => {
        let parsedX = parseFloat(rect.x),
            active = (!(100 - parsedX  > that.leftFilterStyle || parsedX >= that.rightFilterStyle)) ;
        rect.active = active;
        rect.fill = active ? (rect.center ? '#1C00E2': '#FFCB00') : "#d3d3d3";
        if(active){
          leftFilter ? leftDate = Math.min(leftDate, rect.dateNumber) : rightDate = Math.max(rightDate, rect.dateNumber) ;
        }
      });
      leftFilter ? that.leftDate = leftDate == 1e13 ? that.leftDate : leftDate : that.rightDate = rightDate == 0 ? that.rightDate : rightDate;
      that.gisService.setCircles(that) ;
      that.changeRef.detectChanges();
    }

    function onUpMouse(){
      that.innerData.events.forEach(fn => {
        fn();
      });
      that.innerData.events = [];
    }
  }
}
