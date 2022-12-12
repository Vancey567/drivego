import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderRoutingModule } from './rider-routing.module';
import { RiderComponent } from './rider.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    RiderComponent
  ],
  imports: [
    CommonModule,
    RiderRoutingModule,
    AllModuleModule
  ]
})
export class RiderModule { }
