import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferRoutingModule } from './refer-routing.module';
import { ReferComponent } from './refer.component';
import {AllModuleModule} from './../all-module/all-module.module';


@NgModule({
  declarations: [
    ReferComponent
  ],
  imports: [
    CommonModule,
    ReferRoutingModule,
    AllModuleModule
  ]
})
export class ReferModule { }
