import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './helper/auth.gard';

const routes: Routes = [
 
  { path: 'login', component: UsermanagementComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
