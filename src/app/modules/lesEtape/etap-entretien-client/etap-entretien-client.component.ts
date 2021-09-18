import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { notificationsService } from 'src/app/_services/dialog-service/notifications.service';
import { EntretienClientService } from 'src/app/_services/entretienClient/entretien-client.service';
import { EntretienClient } from 'src/app/_services/entretienClient/entretienClient';

@Component({
  selector: 'app-etap-entretien-client',
  templateUrl: './etap-entretien-client.component.html',
  styleUrls: ['./etap-entretien-client.component.css']
})
export class EtapEntretienClientComponent implements OnInit {
  @Input() tjm : number;
  @Output() event = new EventEmitter<number>()
  entretienClients: EntretienClient[] = [];
  entretienClient: EntretienClient = new EntretienClient();
  id: number;
 

  searchKey: string;
  panelTitle: string = "Modifier"; 
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

  
  nextEtape(){
    this.event.emit(5);
  }
  getEntretienClientById() {
    this.entretienClientService.getEntretienClientsByCvId(this.id).subscribe(
      response => {
        this.entretienClient = response;
        if (response == null) {
          this.entretienClient = new EntretienClient();
          this.entretienClient.tjm = this.tjm;
          this.panelTitle = "Ajouter";
        }else{
          this.event.emit(4);
        }
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
        if (this.panelTitle == "Ajouter") {
          this.notificationsService.onSuccess("Ajout réussi");
          this.panelTitle = "Modifier"
        }else{
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
        this.getEntretienClientById();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

}
