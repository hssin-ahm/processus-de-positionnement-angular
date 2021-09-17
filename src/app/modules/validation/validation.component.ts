import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Validation } from 'src/app/_services/validation/validation';
import { ValidationService } from 'src/app/_services/validation/validation.service';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  dataSource: MatTableDataSource<Validation>;
  validations : Validation[] = [];
  validation: Validation = new Validation();
  id : number;
  iClass: string;

  toppings = new FormControl();
  toppingList: string[] = [];

  columns: string[] = ["date", "demarrageMission", "remarque", "statut", "actions"]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Détails";
  

  constructor(
    private validationService: ValidationService, 
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService : ConsultantService
    ) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getValidationByConsultantId();
    
  }

  getValidationByConsultantId(){
    this.validationService.getAllValidationsByConsultantId(this.id).subscribe(
      response=>{
        this.validations = response;
        this.dataSource =  new MatTableDataSource(this.validations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.iClass = "";
        if (response.length == 0) {
          this.warn();
        }
      }
    )
  }
  warn(){
    return new Promise((resolve , reject) => {
      setTimeout(() => {
          this.notificationsService.onWarn("pas de validation de ce consultant")
        resolve("function done");
      }, 500);
    });
   
  }
  
  onSearchClear() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter(event){
    this.searchKey = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  updateValidation(validation: Validation){ 
  this.validation = validation;
  this.iClass = this.getIClass(this.validation.feedback);
  this.display();
  }
  
  display(){
    const table = document.getElementById('tableCv');
    const addEntretien = document.getElementById('addValidation');
    if (table.style.display == "block") {
      table.style.display = "none";
      addEntretien.style.display = "block";
     
    }else {
      addEntretien.style.display = "none";
      table.style.display = "block";
      this.validation = new Validation();
      this.getValidationByConsultantId();

    }
  }
  getIClass(feedback: String) {
    switch (feedback) {
      case "Consultant retenu": {
        return "indicator bg-success";
      }
      case "Non retenu": {
        return "indicator bg-danger";
      }
      default: {
        return "indicator bg-warning";
      }
    }
  }
  
  
  
  
  public onOpenDeleteModal(validation: Validation): void{
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteValidation(validation.idValidation);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });
  }
  
  
  
  public onDeleteValidation(id: number): void {
    this.validationService.deleteValidation(id).subscribe(
      (response: void) => {
        this.getValidationByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  onChange(deviceValue) {
    switch (deviceValue) {
      case "Consultant retenu": {
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
