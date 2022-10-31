import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripDetailsRoutingModule } from './trip-details-routing.module';
import { TripDetailsComponent } from './trip-details.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    TripDetailsComponent
  ],
  imports: [
    CommonModule,
    TripDetailsRoutingModule,
    AllModuleModule
  ]
})
export class TripDetailsModule { }
