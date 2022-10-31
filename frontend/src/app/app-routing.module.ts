import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'user-details', loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule) },
  { path: 'start-ride', loadChildren: () => import('./rider/start-ride/start-ride.module').then(m => m.StartRideModule) },
  { path: 'start-trip', loadChildren: () => import('./trip/start-trip/start-trip.module').then(m => m.StartTripModule) },
  { path: 'trip-details', loadChildren: () => import('./trip/trip-details/trip-details.module').then(m => m.TripDetailsModule) },
  { path: 'rider-list', loadChildren: () => import('./rider/rider-list/rider-list.module').then(m => m.RiderListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
