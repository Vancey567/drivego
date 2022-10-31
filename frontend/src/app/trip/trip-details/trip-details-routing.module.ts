import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripDetailsComponent } from './trip-details.component';

const routes: Routes = [{ path: '', component: TripDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripDetailsRoutingModule { }
