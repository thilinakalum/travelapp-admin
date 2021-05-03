import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CountryComponent} from '../../travel/country/country.component';
import {CityComponent} from '../../travel/city/city.component';
import {StateComponent} from '../../travel/state/state.component';
import {InterestComponent} from '../../travel/interest/interest.component';
import {ActivityComponent} from '../../travel/activity/activity.component';
import {MapComponent} from '../../travel/map/map.component';
import {AttractionComponent} from '../../travel/attraction/attraction.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    InterestComponent,
    ActivityComponent,
    MapComponent,
    AttractionComponent,
  ]
})

export class AdminLayoutModule {}
