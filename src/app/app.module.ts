import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './Layouts/admin/admin.module';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EtapCvEnvoyeeComponent } from './modules/lesEtape/etap-cv-envoyee/etap-cv-envoyee.component';
import { EtapEntretienPartenaireComponent } from './modules/lesEtape/etap-entretien-partenaire/etap-entretien-partenaire.component';
import { EtapPositionnementClientComponent } from './modules/lesEtape/etap-positionnement-client/etap-positionnement-client.component';
import { EtapBriefingComponent } from './modules/lesEtape/etap-briefing/etap-briefing.component';
import { EtapEntretienClientComponent } from './modules/lesEtape/etap-entretien-client/etap-entretien-client.component';
import { EtapTestTechniqueComponent } from './modules/lesEtape/etap-test-technique/etap-test-technique.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperAdminComponent,
    ForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AdminModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
