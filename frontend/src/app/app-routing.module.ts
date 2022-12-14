import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'user-details', loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule) },
  { path: 'start-ride', loadChildren: () => import('./rider/start-ride/start-ride.module').then(m => m.StartRideModule) },
  { path: 'start-trip', loadChildren: () => import('./trip/start-trip/start-trip.module').then(m => m.StartTripModule) },
  { path: 'trip-details/:id', loadChildren: () => import('./trip/trip-details/trip-details.module').then(m => m.TripDetailsModule) },
  { path: 'rider-list', loadChildren: () => import('./rider/rider-list/rider-list.module').then(m => m.RiderListModule) },
  { path: 'refer', loadChildren: () => import('./refer/refer.module').then(m => m.ReferModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
