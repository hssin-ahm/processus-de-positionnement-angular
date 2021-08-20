import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: 'super-admin', component: SuperAdminComponent, canActivate:[AuthGuard], data:{roles:['Super_Admin']}},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin'] }},
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
