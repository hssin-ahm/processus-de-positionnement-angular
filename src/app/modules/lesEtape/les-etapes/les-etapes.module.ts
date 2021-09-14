import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntretienPartenaireComponent } from '../../entretien-partenaire/entretien-partenaire.component';
import { EtapCvEnvoyeeComponent } from '../etap-cv-envoyee/etap-cv-envoyee.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ConsultantComponent } from 'src/app/modules/consultant/consultant.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PositionnementClientComponent } from 'src/app/modules/positionnement-client/positionnement-client.component';
import { BriefingComponent } from 'src/app/modules/briefing/briefing.component';
import { EntretienClientComponent } from 'src/app/modules/entretien-client/entretien-client.component';
import { TestTechniqueClientComponent } from 'src/app/modules/test-technique-client/test-technique-client.component';
import { ValidationComponent } from 'src/app/modules/validation/validation.component';
import { ContactsComponent } from 'src/app/modules/contacts/contacts.component';
import { LesEtapesComponent } from 'src/app/modules/lesEtape/les-etapes/les-etapes.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EtapEntretienPartenaireComponent } from '../etap-entretien-partenaire/etap-entretien-partenaire.component';
import { EtapPositionnementClientComponent } from '../etap-positionnement-client/etap-positionnement-client.component';
import { EtapBriefingComponent } from '../etap-briefing/etap-briefing.component';
import { EtapEntretienClientComponent } from '../etap-entretien-client/etap-entretien-client.component';
import { EtapTestTechniqueComponent } from '../etap-test-technique/etap-test-technique.component';


@NgModule({
  declarations: [
    LesEtapesComponent,
    EntretienPartenaireComponent,
    EtapCvEnvoyeeComponent,
    EtapEntretienPartenaireComponent,
    EtapPositionnementClientComponent,
    EtapBriefingComponent,
    EtapEntretienClientComponent,
    EtapTestTechniqueComponent
    
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
    MatMenuModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class LesEtapesModule { }
