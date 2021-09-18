import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog-service/dialog.service';
import { notificationsService } from 'src/app/_services/dialog-service/notifications.service';
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
  @Input() tjm : number;
  @Output() event = new EventEmitter<number>()

  entretiens: Entretien[] = [];
  entretien: Entretien = new Entretien();
  id: number;

  cvEnvoyes: CvEnvoye[];
  cvEnvoye : CvEnvoye;

  searchKey: string;
  panelTitle: string = "Modifier";
  consultant: Consultant;
  iClass: string;
  consId: any;


  constructor(
    private entretienPartenaireService: EntretienPartenaireService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService, 
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv']; 
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    
    this.getEntretienById(); 
  }

  
  getEntretienById() {
    this.entretienPartenaireService.getEntretiensByCvId(this.id).subscribe(
      response => {
        this.entretien = response;
        if (response == null) {
          this.entretien = new Entretien();
          this.entretien.tjm = this.tjm;
          this.panelTitle = "Ajouter";
        }else{ 
          this.iClass = this.getIClass(this.entretien.statut);
          this.event.emit(1);
        }
      }
    )
  } 

  nextEtape(){
    this.event.emit(2);
  }
 
  onUpdateEntretien(entForm: NgForm) {
    this.entretien = entForm.value;
    this.onModifyEntretien(this.entretien);

    
  }


  public onModifyEntretien(entretien: Entretien): void {
    entretien.cvEnvoyee = this.cvEnvoye;
    
    this.entretienPartenaireService.updateEntretien(entretien, this.id, this.consId).subscribe(
      (response: Entretien) => {
        if (this.panelTitle == "Ajouter") {
          this.notificationsService.onSuccess("Ajout réussi");
          this.panelTitle = "Modifier"
        }else{
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
        this.getEntretienById();
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
