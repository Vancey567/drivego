import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferComponent } from './refer.component';

const routes: Routes = [{ path: '', component: ReferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferRoutingModule { }
