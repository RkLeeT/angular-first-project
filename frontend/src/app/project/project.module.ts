import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ProjectRoutingModule, projectRouteComponents } from './project-routing.module';


@NgModule({
  declarations: [projectRouteComponents],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
  ],
})
export class ProjectModule { }
