import { Injectable } from '@angular/core';
let DG = require('2gis-maps');

@Injectable()
export class GisService{
  
  public mapCircles  = {};
  public onClickContext = function($event : any) {
     let popupMess = '<ul>' ,
         mess = this.mapCircles[$event.target.options.className].mess;
     for(let key in mess){
       let m = mess[key];
       if(m.active){
         popupMess += '<li>'+m.date +' - '+ m.name+'</li>';
       }
     }
     popupMess += '</ul>';
     $event.target.bindPopup(popupMess).openPopup($event.latlng);
     
  }.bind(this) ;

  
  public startMap(that){
      DG.then(function(){
        that.map2Gis = DG.map('mapContainer', {
          'center': [55.75222, 37.81556],
          'zoom': 10
        });
      });
    }
    
    
    public setCircles(context  : any){ //
      let that = this;
      context.rects.forEach(rect => {
        let activeRect = rect.active;
            rect.messArr.forEach(mess => {
                let r, innerMess,
                    circleObj = that.mapCircles[mess.lat +'/'+ mess.long];
                
                if(!circleObj){
                    circleObj = new MessageCircle(parseFloat(mess.lat), parseFloat(mess.long), (rect.center ?  '#1C00E2': '#FFCB00'));
                    circleObj.circle.addTo(context.map2Gis);
                    circleObj.circle.on({click : that.onClickContext});
                    that.mapCircles[mess.lat +'/'+ mess.long] = circleObj;
                }
                innerMess = circleObj.mess[mess.id];
                r = circleObj.circle.getRadius();
                if(!innerMess){
                  innerMess = circleObj.mess[mess.id] = mess;
                }
                if(innerMess.active != activeRect){
                  r = activeRect ? r + 200 : innerMess.active == undefined ? r : r - 200;
                  circleObj.circle.setStyle({fillOpacity : (r <= 100 ? 0 : 0.8) });
                  circleObj.circle.setRadius(r);
                  innerMess.active = activeRect;
                }
              })
        });
      context.changeRef.detectChanges();
    }
}
export class MessageRect{
  constructor( public x : string, public y : string, public fill : string, public messArr : any[], public dateNumber : number, public active = true, public center: number){}
}

export class MessageCircle{
  
  public circle : any;
  
  constructor(public lat : number, public long : number, public fill : string, public mess = {}){
     this.circle = DG.circle([this.lat, this.long], {fillColor : this.fill, stroke : false, fillOpacity : 0, weight : 0, className : this.lat+'/'+ this.long});
  }
}
