import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import {AllModuleModule} from './../all-module/all-module.module';


@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    AllModuleModule
  ]
})
export class UserDetailModule { }
