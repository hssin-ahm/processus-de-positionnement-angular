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
import { Consultant } from 'src/app/modules/consultant/consultant';
@NgModule({
  declarations: [
    AdminComponent,
    ConsultantComponent,
    PositionnementsComponent,
    UpdateConsultantComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
    
  ]
})
export class AdminModule { }
