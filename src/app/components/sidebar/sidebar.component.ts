import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/country', title: 'Country',  icon: 'ni-world text-custom', class: '' },
    { path: '/state', title: 'State',  icon: 'ni-square-pin text-custom', class: '' },
    { path: '/city', title: 'City',  icon: 'ni-pin-3 text-custom', class: '' },
    { path: '/interest', title: 'Interest',  icon: 'ni-satisfied text-custom', class: '' },
    { path: '/activity', title: 'Activity',  icon: 'ni-user-run text-custom', class: '' },
    { path: '/attraction', title: 'Attraction',  icon: 'ni-planet text-custom', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

export const LOCATION_ROUTES: RouteInfo[] = [
  { path: '/map', title: 'Map',  icon: 'ni-map-big text-custom', class: '' },
];

export const USER_ROUTES: RouteInfo[] = [
  { path: '/user', title: 'Users',  icon: 'fa-user text-custom', class: '' },
  // { path: '/role', title: 'Roles',  icon: 'fa-id-badge text-custom', class: '' },
  // { path: '/permission', title: 'Permissions',  icon: 'fa-user-secret  text-custom', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public locationMenuItems: any[];
  public userManagementItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.locationMenuItems = LOCATION_ROUTES.filter(menuItem => menuItem);
    this.userManagementItems = USER_ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
