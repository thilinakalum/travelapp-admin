import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {CityModel} from '../../model/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cites: CityModel[];
  city = new CityModel();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    this.findAllCities();
  }

  findAllCities() {
    this.masterService.getAllCities()
      .subscribe((result) => {
        this.cites = result;
      }, error => {

      });
  }

  saveCity() {
    this.city.status = 'ACTIVE';
    this.masterService.saveCity(this.city)
      .subscribe((result) => {
        this.cites.push(result);
        this.city = new CityModel();
      }, error => {

      });
  }

  cancel() {
    this.city = new CityModel();
  }
}


