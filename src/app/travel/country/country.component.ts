import {Component, OnInit} from '@angular/core';
import {CountryModel} from '../../model/country.model';
import {MasterService} from '../../services/master.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: CountryModel[];
  country = new CountryModel();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    this.findAllCountries();
  }

  findAllCountries() {
    this.masterService.getAllCountries()
      .subscribe((result) => {
        this.countries = result;
      }, error => {

      });
  }

  saveCountry() {
    this.country.status = 'ACTIVE';
    this.masterService.saveCountry(this.country)
      .subscribe((result) => {
        this.countries.push(result);
        this.country = new CountryModel();
      }, error => {

      });
  }

  cancel() {
    this.country = new CountryModel();
  }

  edit(country: CountryModel) {
    this.country = country;
  }

  delete(country: CountryModel) {

  }

}
