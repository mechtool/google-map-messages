import {Component, ElementRef, Inject, ChangeDetectorRef, Renderer2, ViewChildren, QueryList} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector : 'mes-svg-message-filter',
  styleUrls : ['./svg-message-filter.component.css'],
  templateUrl : './svg-message-filter.component.html',
})
export class SvgMessageFilterComponent{

  public leftFilterStyle = '100%';
  public rightFilterStyle = '100%';
  public innerData : any = {events : []};
  @ViewChildren('leftFilter, rightFilter') public filters : QueryList<any>;
  
  constructor(private elementRef : ElementRef, public changeRef : ChangeDetectorRef, @Inject(DOCUMENT) private documentRef : any, private renderer : Renderer2){}

  onDownFilter($event){
    let that = this,
        target = $event.target,
        boundingRect = target.getBoundingClientRect(),
        leftFilter = target.classList.contains('leftFilter');
    that.innerData.diff = (leftFilter ? boundingRect.right - $event.clientX :  $event.clientX - boundingRect.left);
    that.innerData.events.push(that.renderer.listen(that.documentRef, 'mousemove', onMoveMouse));
    that.innerData.events.push(that.renderer.listen(that.documentRef,'mouseup',  onUpMouse));

    function onMoveMouse($event){
      let parentBounding = target.parentElement.getBoundingClientRect(),
        span = $event.clientX - parentBounding.left,
        left = parentBounding.width - (span + that.innerData.diff),
        right = span - that.innerData.diff,
        filters = that.filters.toArray();
      leftFilter ? that.leftFilterStyle = (left  <= (parentBounding.width - filters[1].nativeElement.offsetLeft) ? parentBounding.width - filters[1].nativeElement.offsetLeft - 1 : left >= parentBounding.width ? parentBounding.width :  left)+'px' : that.rightFilterStyle = (right <= filters[0].nativeElement.offsetLeft + parentBounding.width ? filters[0].nativeElement.offsetLeft + parentBounding.width : right >= parentBounding.width ? parentBounding.width : right)+'px';
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
