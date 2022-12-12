import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  { path: '', component: HistoryComponent,children:[
    { path: 'rider', loadChildren: () => import('./rider/rider.module').then(m => m.RiderModule) }, 
    { path: 'driver', loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule) }
  ] }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
