import {Routes} from '@angular/router';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {CountryComponent} from '../../travel/country/country.component';
import {StateComponent} from '../../travel/state/state.component';
import {CityComponent} from '../../travel/city/city.component';
import {InterestComponent} from '../../travel/interest/interest.component';
import {ActivityComponent} from '../../travel/activity/activity.component';
import {MapComponent} from '../../travel/map/map.component';
import {AttractionComponent} from '../../travel/attraction/attraction.component';
import {UserComponent} from '../../travel/user/user.component';

export const AdminLayoutRoutes: Routes = [
  // { path: 'dashboard',      component: DashboardComponent },
  {path: 'user-profile', component: UserProfileComponent},
  // { path: 'tables',         component: TablesComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  {path: 'country', component: CountryComponent},
  {path: 'state', component: StateComponent},
  {path: 'city', component: CityComponent},
  {path: 'interest', component: InterestComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'map', component: MapComponent},
  {path: 'attraction', component: AttractionComponent},
  {path: 'user', component: UserComponent},
];
