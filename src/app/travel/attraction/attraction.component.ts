import { Component, OnInit } from '@angular/core';
import {AttractionService} from '../../services/attraction.service';
import {AttractionModel} from '../../model/attraction.model';
import {CountryModel} from '../../model/country.model';
import {CoordinatesModel} from '../../model/coordinates.model';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css']
})
export class AttractionComponent implements OnInit {

  isNew = true;
  attractions: AttractionModel[];
  attraction = new AttractionModel();
  coordinates = new CoordinatesModel();

  constructor(private attractionService: AttractionService) { }

  ngOnInit(): void {
    this.findAllAttractions();
  }

  findAllAttractions() {
    this.attractionService.getAllAttractions()
      .subscribe((result) => {
        this.attractions = result;
      }, error => {

      });
  }

  saveAttractions() {
    this.attraction.status = 'ACTIVE';
    this.attraction.coordinates = this.coordinates;
    console.log(this.attraction);
    this.attractionService.saveAttraction(this.attraction)
      .subscribe((result) => {
        this.attractions.push(result);
        this.attraction = new AttractionModel();
        this.isNew = true;
      }, error => {

      });
  }

  cancel() {
    this.attraction = new AttractionModel();
    this.coordinates = new CoordinatesModel();
  }

  edit(attraction: AttractionModel) {
    this.isNew = false;
    console.log(attraction);
    this.attraction = attraction;
    this.coordinates = this.attraction.coordinates;
  }

  delete(country: CountryModel) {

  }

}
