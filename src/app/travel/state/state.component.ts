import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {StateModel} from '../../model/state.model';
import {ToastrService} from 'ngx-toastr';

const pageSize: number = 10;

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  states: StateModel[];
  state = new StateModel();

  constructor(private masterService: MasterService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
  }

  ngOnInit(): void {
    this.getAllStates();
  }

  getAllStates() {
    this.masterService.getAllStates()
      .subscribe((result) => {
        this.states = result;
      }, error => {

      });
  }

  saveState() {
    this.state.status = 'ACTIVE';
    this.masterService.saveState(this.state)
      .subscribe((result) => {
        this.states.push(result);
        this.state = new StateModel();
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
    this.state = new StateModel();
    this.viewCreate = false;
  }

  edit(state: StateModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.state = state;
  }

  delete(state: StateModel) {
  }
}
