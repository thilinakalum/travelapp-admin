import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {CityModel} from '../../model/city.model';
import {ToastrService} from 'ngx-toastr';

const pageSize: number = 10;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  cites: CityModel[];
  city = new CityModel();

  constructor(private masterService: MasterService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
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
    this.city = new CityModel();
    this.viewCreate = false;
  }

  edit(city: CityModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.city = city;
  }

  delete(city: CityModel) {
  }
}


