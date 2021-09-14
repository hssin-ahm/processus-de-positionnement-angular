import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { EntretienClientService } from 'src/app/_services/entretienClient/entretien-client.service';
import { EntretienClient } from 'src/app/_services/entretienClient/entretienClient';

@Component({
  selector: 'app-etap-entretien-client',
  templateUrl: './etap-entretien-client.component.html',
  styleUrls: ['./etap-entretien-client.component.css']
})
export class EtapEntretienClientComponent implements OnInit {

  entretienClients: EntretienClient[] = [];
  entretienClient: EntretienClient = new EntretienClient();
  id: number;
 

  searchKey: string;
  panelTitle: string = "Modifier"; 
  tjm: number;
  iClass: string;
  consId: any;


  constructor(
    private entretienClientService: EntretienClientService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    
    this.consId = this.route.snapshot.queryParamMap.get('constId');
 
    this.getEntretienClientById(); 
  }

  
  getEntretienClientById() {
    this.entretienClientService.getEntretienClientsByCvId(this.id).subscribe(
      response => {
        this.entretienClient = response;
      }
    )
  } 

  
  onUpdateEntretien(entForm: NgForm) {
    this.entretienClient = entForm.value;
    this.onModifyEntretienClient(this.entretienClient);

    
  }


  public onModifyEntretienClient(entretienClient: EntretienClient): void {
    
    this.entretienClientService.updateEntretienClient(entretienClient, this.id, this.consId).subscribe(
      (response: EntretienClient) => {
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

}
