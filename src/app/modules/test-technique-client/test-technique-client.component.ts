import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { TestTechniqueClientService } from 'src/app/_services/testTechniqueClient/test-technique-client.service';
import { TestTechniqueClient } from 'src/app/_services/testTechniqueClient/testTechniqueClient';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-test-technique-client',
  templateUrl: './test-technique-client.component.html',
  styleUrls: ['./test-technique-client.component.css']
})
export class TestTechniqueClientComponent implements OnInit {

  dataSource: MatTableDataSource<TestTechniqueClient>;
  testTechniqueClients : TestTechniqueClient[] = [];
  testTechniqueClient: TestTechniqueClient = new TestTechniqueClient();
  id : number;

  toppings = new FormControl();
  toppingList: string[] = [];
  updateToppingList: string[] = [];

  columns: string[] = ["dateEntretien", "typeEntretien", "observations", "statut", "actions"]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Ajouter";
  

  constructor(
    private testTechniqueClientService: TestTechniqueClientService, 
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService : ConsultantService
    ) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getTestTechniqueClientsByConsultantId();
    
  }

  getTestTechniqueClientsByConsultantId(){
    this.testTechniqueClientService.getTestTechniqueClientsByConsId(this.id).subscribe(
      response=>{
        this.testTechniqueClients = response;
        this.dataSource =  new MatTableDataSource(this.testTechniqueClients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  
  onSearchClear() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter(event){
    this.searchKey = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  updateTestTechniqueClient(testTechniqueClient: TestTechniqueClient){
  this.panelTitle = "Modifier";
  this.testTechniqueClient = testTechniqueClient;
  this.display();
  }
  
  display(){
    const table = document.getElementById('tableCv');
    const addEntretien = document.getElementById('addTestTechniqueClient');
    if (table.style.display == "block") {
      table.style.display = "none";
      addEntretien.style.display = "block";
     
    }else {
      addEntretien.style.display = "none";
      table.style.display = "block";
      this.panelTitle = "Ajouter";
      this.testTechniqueClient = new TestTechniqueClient();
      this.getTestTechniqueClientsByConsultantId();

    }
  }
  
  
  public getConsultant(consultantId: number): void {
    this.consultantService.getConsultant(consultantId).subscribe(
      (response: Consultant) => {
        this.testTechniqueClient.consultant = response;
        delete this.testTechniqueClient.consultantId;
        this.onModifyTestTechniqueClient(this.testTechniqueClient);
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  onUpdateTestTechniqueClient(entForm: NgForm){
    this.testTechniqueClient = entForm.value;
    if (entForm.value.idTestTechniqueClient) {
      this.getConsultant(this.id);
      
    }else{
      this.onAddTestTechniqueClient(this.testTechniqueClient);
      entForm.reset();
    }
  }
  

  public onModifyTestTechniqueClient(testTechniqueClient: TestTechniqueClient): void {
    this.testTechniqueClientService.updateTestTechniqueClient(testTechniqueClient).subscribe(
      (response: TestTechniqueClient) => {
        this.display();
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTestTechniqueClient(testTechniqueClient: TestTechniqueClient): void {
    
    this.testTechniqueClientService.addTestTechniqueClient(this.testTechniqueClient, this.id).subscribe(
      (response: TestTechniqueClient) => {
        console.log(response);
        this.getTestTechniqueClientsByConsultantId();
        this.display();
        this.notificationsService.onSuccess("Ajout réussi");
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  public onOpenDeleteModal(testTechniqueClient: TestTechniqueClient): void{
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteTestTechniqueClient(testTechniqueClient.idTestTechniqueClient);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });
  }
  
  
  
  public onDeleteTestTechniqueClient(id: number): void {
    this.testTechniqueClientService.deleteTestTechniqueClient(id).subscribe(
      (response: void) => {
        this.getTestTechniqueClientsByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  
}
