import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderListComponent } from './rider-list.component';

const routes: Routes = [{ path: '', component: RiderListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderListRoutingModule { }
