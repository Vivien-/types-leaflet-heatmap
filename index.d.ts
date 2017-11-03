import * as L from 'leaflet';

declare module 'leaflet' {
    interface HeatmapOverlay extends Layer {
        initialize(a:any,b:any): void;
        onAdd(a:any):any;
        addTo(a:any):any;
        onRemove(a:any):any;
        _draw():void;
        _update():void;
        setData(a:any):void;
        addData(a:any):void;
        _reset():void
    }
    function heatmapOverlay(a:any): any;
    
}