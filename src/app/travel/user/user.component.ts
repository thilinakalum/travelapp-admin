import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {Page} from '../../model/page';
import {RoleModel} from '../../model/role.model';

const pageSize: number = 10;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isNew = true;
  viewCreate = false;
  currentSelectedPage: number;
  totalPages: number;
  pageIndexes: Array<number> = [];
  user = new UserModel();
  users: Array<UserModel> = [];
  roles: Array<RoleModel> = [];

  constructor(private userService: UserService) {
    this.currentSelectedPage = 0;
    this.totalPages = 0;
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
      }, error => {

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
    this.userService.getPagableCustomers(pageNumber, pageSize)
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

  edit(user: UserModel) {
    this.viewCreate = true;
    this.isNew = false;
    this.user = user;
  }

  createViewer() {
    this.viewCreate = true;
  }

  cancel() {
    this.user = new UserModel();
    this.viewCreate = false;
  }
}
