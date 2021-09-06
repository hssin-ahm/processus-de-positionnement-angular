import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';
import { Positionnement } from 'src/app/_services/positionnement/positionnement';
import { PositionnementService } from 'src/app/_services/positionnement/positionnement.service';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-positionnement-client',
  templateUrl: './positionnement-client.component.html',
  styleUrls: ['./positionnement-client.component.css']
})
export class PositionnementClientComponent implements OnInit {

  dataSource: MatTableDataSource<Positionnement>;
  positionnements : Positionnement[] = [];
  positionnement: Positionnement = new Positionnement();
  id : number;

  toppings = new FormControl();
  toppingList: string[] = [];
  updateToppingList: string[] = [];
  cvEnvoyes: CvEnvoye[];

  columns: string[] = ["date", "nomDuClient","intituleDuPoste", "tjm", "remarques", "statut", "actions"]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Ajouter";
  consultant: Consultant;
  tjm: number;
  

  constructor(
    private positionnementService: PositionnementService, 
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService : ConsultantService,
    private cvEnvoyeService : CvEnvoyeService
    ) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getPositionnementsByConsultantId();
    
  }

  getPositionnementsByConsultantId(){
    this.positionnementService.getPositionnementsByConsId(this.id).subscribe(
      response=>{
        this.positionnements = response;
        this.dataSource =  new MatTableDataSource(this.positionnements);
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

  updatePositionnement(positionnement: Positionnement){
  this.panelTitle = "Modifier";
  this.positionnement = positionnement;
  this.display();
  }
  
  display(){
    const table = document.getElementById('tableCv');
    const addEntretien = document.getElementById('addPositionnement');
    if (table.style.display == "block") {
      table.style.display = "none";
      addEntretien.style.display = "block";
      if (!this.positionnement.idPositionnement) {
        this.getCvEnvoyeByConsultantId();
      }
    }else {
      addEntretien.style.display = "none";
      table.style.display = "block";
      this.panelTitle = "Ajouter";
      this.positionnement = new Positionnement();
      this.getPositionnementsByConsultantId();

    }
  }
  
  
  public getConsultant(consultantId: number): void {
    this.consultantService.getConsultant(consultantId).subscribe(
      (response: Consultant) => {
        this.positionnement.consultant = response;
        delete this.positionnement.consultantId;
        this.onModifyPositionnement(this.positionnement);
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  onUpdatePositionnement(entForm: NgForm){
    this.positionnement = entForm.value;
    if (entForm.value.idPositionnement) {
      this.getConsultant(this.id);
      
    }else{
      this.onAddPositionnement(this.positionnement);
      entForm.reset();
    }
  }
  

  public onModifyPositionnement(positionnement: Positionnement): void {
    console.log(positionnement);
    debugger
    this.positionnementService.updatePositionnement(positionnement).subscribe(
      (response: Positionnement) => {
        this.display();
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPositionnement(positionnement: Positionnement): void {
    
    this.positionnementService.addPositionnement(this.positionnement, this.id).subscribe(
      (response: Positionnement) => {
        console.log(response);
        this.getPositionnementsByConsultantId();
        this.display();
        this.notificationsService.onSuccess("Ajout réussi");
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  public onOpenDeleteModal(positionnement: Positionnement): void{
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteEntretien(positionnement.idPositionnement);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });
  }
  
  
  
  public onDeleteEntretien(id: number): void {
    this.positionnementService.deletePositionnement(id).subscribe(
      (response: void) => {
        this.getPositionnementsByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  getCvEnvoyeByConsultantId(){
    this.cvEnvoyeService.getCvEnvoyeByConsultantId(this.id).subscribe(
      response=>{
        this.cvEnvoyes = response;
        this.getMoyenOfTjm();
        
      }
    )
  }
  
   getMoyenOfTjm(){
     var tjms = 0;
     if (this.cvEnvoyes) {
       this.cvEnvoyes.forEach(element => {
         tjms += element.tjm;
       });
       this.tjm = tjms/this.cvEnvoyes.length;
     }
     this.positionnement.tjm = this.tjm;
    }
}
