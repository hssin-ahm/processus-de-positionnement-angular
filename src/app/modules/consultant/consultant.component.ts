import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
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
  
  constructor(private consultantService: ConsultantService, private router: Router, private dialogService: DialogService,
    private userAuthService: UserAuthService){}

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
       
        this.logout();
      }
    );
  }
  public logout(){
    this.userAuthService.clear();
    this.router.navigate(["/login"])
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
        this.logout();
        addForm.reset();
      }
    );
  }

  public searchConsultants(key: string): void {
   
    this.consultantService.findByKeyword(key).subscribe(
      (response: Consultant[]) => {
        this.consultants = response;
      }
    );
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
        this.logout();
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
