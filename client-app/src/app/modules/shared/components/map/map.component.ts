import { Component, Input, OnInit } from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Feature } from 'src/app/modules/core/models/map-response.model';
import { ICoordinates } from 'src/app/modules/core/models/localization.model';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @Input() coordinates?: ICoordinates;
    map!: mapboxgl.Map;
    geocoder!: MapboxGeocoder;
    marker!: mapboxgl.Marker;
    selectedPoint?: Feature;

    ngOnInit(): void {
        this.marker = new mapboxgl.Marker();
        this.initializeMap();
        this.initializeGeocoder();
        this.initializeEvents();
    }

    initializeMap = () => {
        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: environment.mapbox.accessToken,
            //center: new mapboxgl.LngLat(19.22, 52.06),
        });
    };

    initializeGeocoder = () => {
        this.geocoder = new MapboxGeocoder({
            accessToken: environment.mapbox.accessToken,
            marker: false,
            countries: 'pl',
            // @ts-ignore: problem with type from @types/mapbox-gl
            mapboxgl: mapboxgl,
            reverseGeocode: true,
        });
        this.map.addControl(this.geocoder);
    };

    initializeEvents = () => {
        this.map.on('click', (e) => {
            this.geocoder.query(`${e.lngLat.lat},${e.lngLat.lng}`);
        });
        this.geocoder.on('result', (obj: { result: Feature }) => {
            this.selectedPoint = obj.result ?? null;
            this.moveMarker(new mapboxgl.LngLat(obj.result.center[0], obj.result.center[1]));
        });
    };

    moveMarker = (coordinates: mapboxgl.LngLat) => {
        this.marker.setLngLat(coordinates).addTo(this.map);
        console.log(this.selectedPoint);
    };
}
