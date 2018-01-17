import { Injectable } from '@angular/core';
let DG = require('2gis-maps');

@Injectable()
export class GisService{
    public startMap(that){
      DG.then(function(){
        that.map2Gis = DG.map('mapContainer', {
          'center': [55.75222, 37.81556],
          'zoom': 10
        });
        // noinspection TypeScriptValidateJSTypes
        let circle : any = new DG.circle({lat : 55.75222, lon :37.81556}).setRadius(800).addTo(that.map2Gis);
        that.map2Gis.mapCircles = [circle] ;//объект окружностей
      });
    }

}
