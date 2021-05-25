import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {AttractionModel} from '../../model/attraction.model';

const pageSize: number = 10;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  attraction = new AttractionModel();

  constructor(private service: UserService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
  }

  ngOnInit(): void {
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
    this.attraction = new AttractionModel();
    this.viewCreate = false;
  }

  edit(attraction: AttractionModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.attraction = attraction;
  }

  delete(attraction: AttractionModel) {
  }
}
