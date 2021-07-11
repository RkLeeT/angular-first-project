import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: 'project', 
    // loadChildren: './project/project.module#ProjectModule',
    loadChildren: () => ProjectModule,
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth', 
    loadChildren: () => AuthModule,
  },
  { path: 'test', component: TestComponent},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRouteComponents = [TestComponent];
