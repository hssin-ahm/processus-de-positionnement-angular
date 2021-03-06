import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { PositionnementsComponent } from 'src/app/modules/positionnements/positionnements.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ConsultantComponent } from 'src/app/modules/consultant/consultant.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UpdateConsultantComponent } from 'src/app/modules/update-consultant/update-consultant.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CvEnvoyeComponent } from 'src/app/modules/cv-envoye/cv-envoye.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContactDialogComponent } from 'src/app/contact-dialog/contact-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { EntretienPartenaireComponent } from 'src/app/modules/entretien-partenaire/entretien-partenaire.component';
import { PositionnementClientComponent } from 'src/app/modules/positionnement-client/positionnement-client.component';
import { BriefingComponent } from 'src/app/modules/briefing/briefing.component';
import { EntretienClientComponent } from 'src/app/modules/entretien-client/entretien-client.component';
import { TestTechniqueClientComponent } from 'src/app/modules/test-technique-client/test-technique-client.component';
import { ValidationComponent } from 'src/app/modules/validation/validation.component';
import { ContactsComponent } from 'src/app/modules/contacts/contacts.component';
@NgModule({
  declarations: [
    AdminComponent,
    ConsultantComponent,
    PositionnementsComponent,
    UpdateConsultantComponent,
    CvEnvoyeComponent,
    ContactDialogComponent,
    MatConfirmDialogComponent,
    EntretienPartenaireComponent,
    PositionnementClientComponent,
    BriefingComponent,
    EntretienClientComponent,
    TestTechniqueClientComponent,
    ValidationComponent,
    ContactsComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MatMenuModule
    
  ],
  providers:[
    CvEnvoyeService
  ]
})
export class AdminModule { }
