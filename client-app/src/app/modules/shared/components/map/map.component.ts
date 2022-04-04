import { Component, OnInit } from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Feature } from 'src/app/modules/core/models/map-response.model';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    map!: mapboxgl.Map;
    marker!: mapboxgl.Marker;
    selectedPoint?: Feature;

    ngOnInit(): void {
        this.marker = new mapboxgl.Marker();
        this.initializeMap();
    }
    initializeMap = () => {
        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: environment.mapbox.accessToken,
            center: [19.227407189927987, 52.06096121526846],
        });
        const geocoderControl = new MapboxGeocoder({
            accessToken: environment.mapbox.accessToken,
            marker: false,
            countries: 'pl',
            // had to ignore bellow line, wrong type expected
            // @ts-ignore
            mapboxgl: mapboxgl,
            reverseGeocode: true,
        });

        this.map.addControl(geocoderControl);

        this.map.on('click', (e) => {
            //geocoderControl.setInput(`${e.lngLat.lat},${e.lngLat.lng}`);
            geocoderControl.query(`${e.lngLat.lat},${e.lngLat.lng}`);
        });
        geocoderControl.on('result', (obj: { result: Feature }) => {
            this.selectedPoint = obj.result ?? null;
            this.moveMarker(new mapboxgl.LngLat(obj.result.center[0], obj.result.center[1]));
        });
    };

    moveMarker = (coordinates: mapboxgl.LngLat) => {
        this.marker.setLngLat(coordinates).addTo(this.map);
        console.log(this.selectedPoint);
    };
}
