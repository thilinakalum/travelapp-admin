import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {Page} from '../../model/page';
import {RoleModel} from '../../model/role.model';
import {ToastrService} from 'ngx-toastr';

const pageSize: number = 10;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isNew: boolean;
  viewCreate: boolean;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  user = new UserModel();
  users: Array<UserModel> = [];
  roles: Array<RoleModel> = [];
  cdnURL: string;
  isMatchPassword: boolean;
  changePassword: boolean;
  newPassword: string;
  confirmPassword: string;

  constructor(private userService: UserService,
              private toastr: ToastrService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
    this.viewCreate = false;
    this.isNew = true;
    this.cdnURL = 'https://travel-store-cdn.s3-ap-southeast-1.amazonaws.com/';
    this.changePassword = false;
  }

  ngOnInit(): void {
    this.getPage(0);
    this.getRole();
  }

  save() {
    this.userService.saveUser(this.user)
      .subscribe((result) => {
        this.users.push(result);
        this.user = new UserModel();
        this.toastr.success('User data has been save successfully.', 'Success !');
      }, error => {
        this.toastr.error('A problem has been occurred while submitting user data.', 'Error !');
      });
  }

  update() {
    this.user.passwordChanged = this.changePassword;
    this.userService.updateUser(this.user)
      .subscribe((result) => {
        this.user = new UserModel();
        this.toastr.success('User data has been update successfully.', 'Success !');
      }, error => {
        this.toastr.error('A problem has been occurred while update user data.', 'Error !');
      });
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index);
  }

  getRole() {
    this.userService.getAllRoles()
      .subscribe((role: RoleModel[]) => {
          this.roles = role;
        }, (error) => {
          console.log(error);
        }
      );
  }

  getPage(pageNumber: number) {
    this.userService.getPageableUsers(pageNumber, pageSize)
      .subscribe((page: Page<UserModel>) => {
          this.users = page.content;
          this.totalPages = page.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = page.number;
        }, (error) => {
          console.log(error);
        }
      );
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
    this.user = new UserModel();
    this.viewCreate = false;
  }

  edit(user: UserModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.user = user;
  }

  delete(user: UserModel) {
  }

  matchPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.isMatchPassword = true;
      this.user.password = this.newPassword;
    } else {
      this.isMatchPassword = false;
    }
  }
}
