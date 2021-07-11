import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { DetailsComponent } from './details/details.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  { 
    path: '', 
    component: ProjectComponent,
    children: [
      { path: 'analysis', component: AnalysisComponent},
      { path: 'details', component: DetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
export const projectRouteComponents = [ProjectComponent, AnalysisComponent, DetailsComponent];
