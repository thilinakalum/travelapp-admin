import {Component, OnInit} from '@angular/core';
import {MapService} from '../../services/map.service';
import {MainBoundingBoxModel} from '../../model/mainBoundingBox.model';
import {BoundingBoxModel} from '../../model/boundingBox.model';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mainBoundingBoxModel: MainBoundingBoxModel[];
  boundingBoxModels: BoundingBoxModel[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.getAllBoundingBox()
      .subscribe((result) => {
        this.mainBoundingBoxModel = result;
        this.mainBoundingBoxModel.forEach((value, index) => {
          // console.log(value.boundingBoxes);
          for (const boundingBoxesKey in value.boundingBoxes) {
            if (value.boundingBoxes[boundingBoxesKey] !== undefined) {
              this.boundingBoxModels.push(value.boundingBoxes[boundingBoxesKey]);
            }
          }
        });

        let map = document.getElementById('map-canvas');
        const lat = map.getAttribute('data-lat');
        const lng = map.getAttribute('data-lng');

        const myLatlng = new google.maps.LatLng(lat, lng);
        const mapOptions = {
          zoom: 13,
          scrollwheel: true,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        map = new google.maps.Map(map, mapOptions);

        console.log(this.boundingBoxModels.length);
        const blueCoords = [];
        this.boundingBoxModels.forEach(value => {
          blueCoords.push(this.convertBboxToPoly([parseFloat(value.bottom), parseFloat(value.left), parseFloat(value.top), parseFloat(value.right)]));
        });

        // Construct a draggable blue triangle with geodesic set to false.
        new google.maps.Polygon({
          map,
          paths: blueCoords,
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0000FF',
          fillOpacity: 0.35,
          // draggable: true,
          geodesic: false,
        });
      }, error => {

      });
  }

  convertBboxToPoly(bbox) {
    return [
      {lat: bbox[1], lng: bbox[0]},
      {lat: bbox[1], lng: bbox[2]},
      {lat: bbox[3], lng: bbox[2]},
      {lat: bbox[3], lng: bbox[0]},
    ];
  }
}
