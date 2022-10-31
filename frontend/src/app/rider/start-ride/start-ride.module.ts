import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRideRoutingModule } from './start-ride-routing.module';
import { StartRideComponent } from './start-ride.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    StartRideComponent
  ],
  imports: [
    CommonModule,
    StartRideRoutingModule,
    AllModuleModule
  ]
})
export class StartRideModule { }
