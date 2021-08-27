import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Consultant } from './consultant';
import { ConsultantService } from './consultant.service';
@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  public consultants: Consultant[];
  public deleteConsultant: Consultant;
  
  constructor(private consultantService: ConsultantService, private router: Router, private dialogService: DialogService){}

  ngOnInit() {
    this.getConsultants();
  }

  public getDate(date : any){
    let d = new Date();
    var d1 = Date.parse(date);
    if (d1 < d.getTime()) {
        return "Immédiate";
      }
    return date;
  }
  public getConsultants(): void {
    this.consultantService.getConsultants().subscribe(
      (response: Consultant[]) => {
        this.consultants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-consultant-form').click();
    this.consultantService.addConsultant(addForm.value).subscribe(
      (response: Consultant) => {
        console.log(response);
        this.getConsultants();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchConsultants(key: string): void {
    console.log(key);
    const results: Consultant[] = [];
    for (const consultant of this.consultants) {
      if (consultant.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultant.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultant.seniorite.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultant.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(consultant);
      }
    }
    this.consultants = results;
    if (results.length === 0 || !key) {
      this.getConsultants();
    }
  }

  updateConsultant(id: number){
    this.router.navigate(['/admin/update', id]);
  }
  addConsultant(){
    this.router.navigate(['/admin/add']);
  }

  public onOpenDeleteModal(consultant: Consultant): void{


    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer "+ consultant.prenom +" " + consultant.nom)
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteConsultant(consultant.id);
      }
    });
  }

  public onDeleteConsultant(id: number): void {
    this.consultantService.deleteConsultant(id).subscribe(
      (response: void) => {
        this.getConsultants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  getDivClass(statut: string){
    switch(statut) { 
      case "Sortie": { 
         return"widget-26-job-category bg-soft-danger";
      } 
      case "En mission": { 
         return "widget-26-job-category bg-soft-warning";
      } 
      default: { 
         return "widget-26-job-category bg-soft-success"
      } 
  }
}
  getIClass(statut: string){
     switch(statut) { 
      case "Sortie": { 
         return "indicator bg-danger";
      } 
      case "En mission": { 
         return "indicator bg-warning";
      } 
      default: { 
         return "indicator bg-success";
      } 
    }
  }
}
