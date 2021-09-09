import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './Layouts/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { PositionnementsComponent } from './modules/positionnements/positionnements.component';
import { ConsultantComponent } from './modules/consultant/consultant.component';
import { UpdateConsultantComponent } from './modules/update-consultant/update-consultant.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { DirtycheckGuard } from './confirm-exit/dirtycheck.guard';
import { ContactsComponent } from './modules/contacts/contacts.component';

const routes: Routes = [
  { path: 'super-admin', component: SuperAdminComponent, canActivate: [AuthGuard], data: { roles: ['Super_Admin'] } },
  {path: 'consultant', component: ConsultantComponent},
  {
    
    path: 'admin', component: AdminComponent, 
    children: [
      { path: '', component: ConsultantComponent},
      { path: 'page/:num', component: ConsultantComponent},
      { path: 'contacts', component: ContactsComponent },
      { path: 'positionnement', component: PositionnementsComponent },
      { path: 'update/:id', component: UpdateConsultantComponent /* , canDeactivate: [DirtycheckGuard]*/ },
      { path: 'add', component: UpdateConsultantComponent },
      { path: ':success', component: ConsultantComponent }
    ],
    canActivate: [AuthGuard], data: { roles: ['Admin'] }
  },

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppRoutingModule { }
