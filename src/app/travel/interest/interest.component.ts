import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {InterestModel} from '../../model/interest.model';
import {ToastrService} from 'ngx-toastr';
import {AttractionModel} from '../../model/attraction.model';

const pageSize: number = 10;

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  attraction = new AttractionModel();
  interests: InterestModel[];
  interest = new InterestModel();

  constructor(private masterService: MasterService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
  }

  ngOnInit(): void {
    this.getAllInterests();
  }

  getAllInterests() {
    this.masterService.getAllInterests()
      .subscribe((result) => {
        this.interests = result;
      }, error => {

      });
  }

  saveInterest() {
    this.interest.status = 'ACTIVE';
    this.masterService.saveInterest(this.interest)
      .subscribe((result) => {
        this.interests.push(result);
        this.interest = new InterestModel();
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
    this.interest = new InterestModel();
    this.viewCreate = false;
  }

  edit(interest: InterestModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.interest = interest;
  }

  delete(interest: InterestModel) {
  }
}
