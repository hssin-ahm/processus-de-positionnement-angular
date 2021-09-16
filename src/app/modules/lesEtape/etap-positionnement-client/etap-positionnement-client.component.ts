import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Positionnement } from 'src/app/_services/positionnement/positionnement';
import { PositionnementService } from 'src/app/_services/positionnement/positionnement.service';

@Component({
  selector: 'app-etap-positionnement-client',
  templateUrl: './etap-positionnement-client.component.html',
  styleUrls: ['./etap-positionnement-client.component.css']
})
export class EtapPositionnementClientComponent implements OnInit {
  @Input() tjm : number;
  @Output() event = new EventEmitter<number>()
  positionnements: Positionnement[] = [];
  positionnement: Positionnement = new Positionnement();
  id: number;
 

  nextEtape(){
    this.event.emit(3);
  }
  searchKey: string;
  panelTitle: string = "Modifier";  
  iClass: string;
  consId: any;


  constructor(
    private positionnementService: PositionnementService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    console.log(this.id);
    
    this.getPositionnementById(); 
  }

  
  getPositionnementById() {
    this.positionnementService.getPositionnementsByCvId(this.id).subscribe(
      response => {
        this.positionnement = response;
        if (response == null) {
          this.positionnement = new Positionnement();
          this.positionnement.tjm = this.tjm;
          this.panelTitle = "Ajouter";
        }else{
          this.event.emit(2);
        }
      }
    )
  } 

  
  onUpdatePositionnement(entForm: NgForm) {
    this.positionnement = entForm.value;
    this.onModifyPositionnement(this.positionnement);

    
  }


  public onModifyPositionnement(Positionnement: Positionnement): void {
    //Positionnement.cvEnvoyee = this.cvEnvoye;
    console.log(Positionnement);
    
    this.positionnementService.updatePosition(Positionnement, this.id, this.consId).subscribe(
      (response: Positionnement) => {
        if (this.panelTitle == "Ajouter") {
          this.notificationsService.onSuccess("Ajout réussi");
          this.panelTitle = "Modifier"
        }else{
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
        this.getPositionnementById();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
}
