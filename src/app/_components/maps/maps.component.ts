import { Component, OnInit } from '@angular/core';
import { ConfigService, LocalStorageService } from '@app/_services';
import { mapboxAccess } from '../../../environments/environment';

declare var $: any;
declare var mapboxgl: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.less']
})
export class MapsComponent implements OnInit {
  map: any;

  isMap: boolean = false;
  private mapboxKey: any = mapboxAccess.mapboxKey;
  constructor(
    public mapService: ConfigService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  openMap() {
    mapboxgl.accessToken = this.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.4982329, 3.9030421], // starting position
      zoom: 5, // starting zoom
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    this.map.on('click', (e) => {
      console.log('Click', e.lngLat);
      this.localStorageService.remove('client-coordinates');
      this.localStorageService.setObject('client-coordinates', e.lngLat);
      this.closeModal();
    });
  }

  closeModal(): void {
    this.mapService.closed = true;
    this.mapService.oculto = 'oculto';

    $('#myModal').modal('hide');
  }
}
