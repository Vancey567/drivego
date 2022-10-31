import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartRideComponent } from './start-ride.component';

const routes: Routes = [{ path: '', component: StartRideComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRideRoutingModule { }
