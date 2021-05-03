import { Component, OnInit } from '@angular/core';
import {AttractionService} from '../../services/attraction.service';
import {AttractionModel} from '../../model/attraction.model';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css']
})
export class AttractionComponent implements OnInit {

  attractions: AttractionModel[];

  constructor(private attractionService: AttractionService) { }

  ngOnInit(): void {
    this.findAllCountries();
  }

  findAllCountries() {
    this.attractionService.getAllAttractions()
      .subscribe((result) => {
        this.attractions = result;
      }, error => {

      });
  }

}
