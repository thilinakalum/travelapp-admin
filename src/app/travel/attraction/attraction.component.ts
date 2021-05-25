import {Component, OnInit} from '@angular/core';
import {AttractionService} from '../../services/attraction.service';
import {AttractionModel} from '../../model/attraction.model';
import {CountryModel} from '../../model/country.model';
import {CoordinatesModel} from '../../model/coordinates.model';
import {Page} from '../../model/page';
import {UserModel} from '../../model/user.model';
import {ToastrService} from 'ngx-toastr';

const pageSize: number = 8;

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css']
})
export class AttractionComponent implements OnInit {

  viewCreate: boolean;
  isNew: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  attractions: AttractionModel[];
  attraction = new AttractionModel();
  coordinates = new CoordinatesModel();

  constructor(private attractionService: AttractionService,
              private toastr: ToastrService) {
    this.viewCreate = false;
    this.isNew = true;
  }

  ngOnInit(): void {
    this.getPage(0);
  }

  saveAttractions() {
    this.attraction.status = 'ACTIVE';
    this.attraction.coordinates = this.coordinates;
    console.log(this.attraction);
    this.attractionService.saveAttraction(this.attraction)
      .subscribe((result) => {
        this.attractions.push(result);
        this.attraction = new AttractionModel();
        this.isNew = true
        this.toastr.success('User data has been update successfully.', 'Success !');
      }, error => {
        this.toastr.error('A problem has been occurred while update user data.', 'Error !');
      });
  }

  cancel() {
    this.attraction = new AttractionModel();
    this.coordinates = new CoordinatesModel();
    this.viewCreate = false;
  }

  edit(attraction: AttractionModel) {
    this.isNew = false;
    this.viewCreate = true;
    console.log(attraction);
    this.attraction = attraction;
    this.coordinates = this.attraction.coordinates;
  }

  delete(attraction: AttractionModel) {
  }

  createViewer() {
    this.viewCreate = true;
  }

  getPage(pageNumber: number) {
    this.attractionService.getPageableAttractions(pageNumber, pageSize)
      .subscribe((page: Page<AttractionModel>) => {
          this.attractions = page.content;
          this.totalPages = page.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = page.number;
        }, (error) => {
          console.log(error);
        }
      );
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

}
