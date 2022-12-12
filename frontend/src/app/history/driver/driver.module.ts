import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import {AllModuleModule} from './../../all-module/all-module.module';


@NgModule({
  declarations: [
    DriverComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    AllModuleModule
  ]
})
export class DriverModule { }
