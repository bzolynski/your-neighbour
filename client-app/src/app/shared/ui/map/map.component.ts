import { Component, Input, OnInit, Output } from '@angular/core';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ICoordinates } from 'src/app/modules/core/models/localization.model';
import { MarkerFeature } from '../../data-access/models/api/map-response.model';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @Output() markerMoved = new Subject<MarkerFeature>();
    @Input()
    set coordinates(value: ICoordinates | null) {
        if (value) this.queryCoordinates(value.latitude, value.longitude);
    }
    map!: mapboxgl.Map;
    geocoder!: MapboxGeocoder;
    marker!: mapboxgl.Marker;
    selectedPoint?: MarkerFeature;

    ngOnInit(): void {
        this.marker = new mapboxgl.Marker();
        this.initializeMap();
        this.initializeGeocoder();
        this.initializeEvents();
    }

    private initializeMap = () => {
        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: environment.mapbox.accessToken,
            //center: new mapboxgl.LngLat(19.22, 52.06),
        });
    };

    private initializeGeocoder = () => {
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

    private initializeEvents = () => {
        this.map.on('click', (e) => {
            this.queryCoordinates(e.lngLat.lat, e.lngLat.lng);
        });
        this.geocoder.on('result', (obj: { result: MarkerFeature }) => {
            this.selectedPoint = obj.result ?? null;
            this.moveMarker(new mapboxgl.LngLat(obj.result.center[0], obj.result.center[1]));
            this.markerMoved.next(this.selectedPoint);
        });
    };

    private queryCoordinates = (lat: number, lng: number) => {
        this.geocoder.query(`${lat},${lng}`);
    };
    private moveMarker = (coordinates: mapboxgl.LngLat) => {
        this.marker.setLngLat(coordinates).addTo(this.map);
    };
}
