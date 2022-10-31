import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartTripComponent } from './start-trip.component';

const routes: Routes = [{ path: '', component: StartTripComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartTripRoutingModule { }
