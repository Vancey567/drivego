import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartTripRoutingModule } from './start-trip-routing.module';
import { StartTripComponent } from './start-trip.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    StartTripComponent
  ],
  imports: [
    CommonModule,
    StartTripRoutingModule,
    AllModuleModule
  ]
})
export class StartTripModule { }
