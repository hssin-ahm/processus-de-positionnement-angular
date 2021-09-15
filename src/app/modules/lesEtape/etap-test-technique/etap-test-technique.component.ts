import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { TestTechniqueClientService } from 'src/app/_services/testTechniqueClient/test-technique-client.service';
import { TestTechniqueClient } from 'src/app/_services/testTechniqueClient/testTechniqueClient';

@Component({
  selector: 'app-etap-test-technique',
  templateUrl: './etap-test-technique.component.html',
  styleUrls: ['./etap-test-technique.component.css']
})
export class EtapTestTechniqueComponent implements OnInit {

  testTechniqueClients: TestTechniqueClient[] = [];
  testTechniqueClient: TestTechniqueClient = new TestTechniqueClient();
  id: number;
 

  @Output() event = new EventEmitter<number>()
  searchKey: string;
  panelTitle: string = "Modifier"; 
  tjm: number;
  iClass: string;
  consId: any;


  constructor(
    private testTechniqueClientService: TestTechniqueClientService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService 
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    console.log(this.id);
 
    this.getTestTechniqueClientById(); 
  }

  
  getTestTechniqueClientById() {
    this.testTechniqueClientService.getTestTechniqueClientsByCvId(this.id).subscribe(
      response => {
        this.testTechniqueClient = response;
        if (response == null) {
          this.testTechniqueClient = new TestTechniqueClient();
          this.panelTitle = "Ajouter";
        }else{
          this.event.emit(5)
        }
      }
    )
  } 

  
  nextEtape(){
    this.event.emit(6);
  }
  onUpdateTestTechniqueClient(entForm: NgForm) {
    this.testTechniqueClient = entForm.value;
    this.onModifyTestTechniqueClient(this.testTechniqueClient);

    
  }


  public onModifyTestTechniqueClient(TestTechniqueClient: TestTechniqueClient): void {
    //TestTechniqueClient.cvEnvoyee = this.cvEnvoye;
    console.log(TestTechniqueClient);
    
    this.testTechniqueClientService.updateTestTechniqueClientCv(TestTechniqueClient, this.id, this.consId).subscribe(
      (response: TestTechniqueClient) => {
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
