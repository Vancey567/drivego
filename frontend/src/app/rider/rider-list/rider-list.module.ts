import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderListRoutingModule } from './rider-list-routing.module';
import { RiderListComponent } from './rider-list.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    RiderListComponent
  ],
  imports: [
    CommonModule,
    RiderListRoutingModule,
    AllModuleModule
  ]
})
export class RiderListModule { }
