import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './Layouts/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { PositionnementsComponent } from './modules/positionnements/positionnements.component';
import { ConsultantComponent } from './modules/consultant/consultant.component';

const routes: Routes = [
  { path: 'super-admin', component: SuperAdminComponent, canActivate: [AuthGuard], data: { roles: ['Super_Admin'] } },

  {
    path: 'admin', component: AdminComponent, 
    children: [
      { path: '', component: ConsultantComponent },
      { path: 'positionnement', component: PositionnementsComponent },
    ],
    canActivate: [AuthGuard], data: { roles: ['Admin'] }
  },

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
