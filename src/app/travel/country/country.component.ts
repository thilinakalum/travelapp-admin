import {Component, OnInit} from '@angular/core';
import {CountryModel} from '../../model/country.model';
import {MasterService} from '../../services/master.service';
import {ToastrService} from 'ngx-toastr';

const pageSize: number = 10;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  countries: CountryModel[];
  country = new CountryModel();

  constructor(private masterService: MasterService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
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
        this.toastr.success('User data has been update successfully.', 'Success !');
      }, error => {
        this.toastr.error('A problem has been occurred while update user data.', 'Error !');
      });
  }

  getPage(pageNumber: number) {
    // this.service.getPageableUsers(pageNumber, pageSize)
    //   .subscribe((page: Page<UserModel>) => {
    //       this.users = page.content;
    //       this.totalPages = page.totalPages;
    //       this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
    //       this.currentSelectedPage = page.number;
    //     }, (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index);
  }

  active(index: number) {
    if (this.currentSelectedPage === index) {
      return {
        active: true
      };
    }
  }

  nextClick() {
    if (this.currentSelectedPage < this.totalPages - 1) {
      this.getPage(++this.currentSelectedPage);
    }
  }

  previousClick() {
    if (this.currentSelectedPage > 0) {
      this.getPage(--this.currentSelectedPage);
    }
  }

  createViewer() {
    this.viewCreate = true;
  }

  cancel() {
    this.country = new CountryModel();
    this.viewCreate = false;
  }

  edit(country: CountryModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.country = country;
  }

  delete(country: CountryModel) {
  }

}
