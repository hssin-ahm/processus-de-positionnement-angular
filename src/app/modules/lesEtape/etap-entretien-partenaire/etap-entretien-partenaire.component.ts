import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';
import { Entretien } from 'src/app/_services/entretienPartenaire/entretien';
import { EntretienPartenaireService } from 'src/app/_services/entretienPartenaire/entretien-partenaire.service';
import { Consultant } from '../../consultant/consultant';
import { ConsultantService } from '../../consultant/consultant.service';

@Component({
  selector: 'app-etap-entretien-partenaire',
  templateUrl: './etap-entretien-partenaire.component.html',
  styleUrls: ['./etap-entretien-partenaire.component.css']
})
export class EtapEntretienPartenaireComponent implements OnInit {
  entretiens: Entretien[] = [];
  entretien: Entretien = new Entretien();
  id: number;

  cvEnvoyes: CvEnvoye[];
  cvEnvoye : CvEnvoye;

  searchKey: string;
  panelTitle: string = "Modifier";
  consultant: Consultant;
  tjm: number;
  iClass: string;
  consId: any;


  constructor(
    private entretienPartenaireService: EntretienPartenaireService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService,
    private consultantService: ConsultantService,
    private cvEnvoyeService: CvEnvoyeService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    console.log(this.id);
 
    this.getEntretienById(); 
  }

  
  getEntretienById() {
    this.entretienPartenaireService.getEntretiensByCvId(this.id).subscribe(
      response => {
        this.entretien = response;
        this.iClass = this.getIClass(this.entretien.statut);
        //this.cvEnvoye = this.entretien.cvEnvoyee;
      }
    )
  } 

 
  onUpdateEntretien(entForm: NgForm) {
    this.entretien = entForm.value;
    this.onModifyEntretien(this.entretien);

    
  }


  public onModifyEntretien(entretien: Entretien): void {
    entretien.cvEnvoyee = this.cvEnvoye;
    console.log(entretien);
    
    this.entretienPartenaireService.updateEntretien(entretien, this.id, this.consId).subscribe(
      (response: Entretien) => {
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

 



  
  getIClass(statut: String) {
    switch (statut) {
      case "Qualifié": {
        return "indicator bg-success";
      }
      case "En attente": {
        return "indicator bg-warning";
      }
      default: {
        return "indicator bg-danger";
      }
    }
  }
  getCvEnvoyeByConsultantId() {
    this.cvEnvoyeService.getCvEnvoyeByConsultantId(this.consId).subscribe(
      response => {
        this.cvEnvoyes = response;
        this.getMoyenOfTjm();

      }
    )
  }

  getMoyenOfTjm() {
    var tjms = 0;
    if (this.cvEnvoyes) {
      this.cvEnvoyes.forEach(element => {
        tjms += element.tjm;
      });
      this.tjm = tjms / this.cvEnvoyes.length;
    }
    this.entretien.tjm = Math.trunc(this.tjm);
  }
  onChange(deviceValue) {
    switch (deviceValue) {
      case "Qualifié": {
        this.iClass = "indicator bg-success";
        break
      }
      case "En attente": {
        this.iClass = "indicator bg-warning";
        break
      }
      default: {
        this.iClass = "indicator bg-danger";
        break
      }
    }
  }
}
