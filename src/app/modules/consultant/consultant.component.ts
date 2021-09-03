import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
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
  success: string;
  
  constructor(private consultantService: ConsultantService, 
    private router: Router,
    private dialogService: DialogService,
    private userAuthService: UserAuthService,
    private notificationsService: notificationsService,
    private route: ActivatedRoute
    ){}

  ngOnInit() {
    this.success = this.route.snapshot.params['success'];
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
    if (this.success == "as") {
      this.router.navigate(['']).then(() => 
      this.getConsultantsWithNotification('Ajout réussi')
      );
    }else if (this.success == "us"){
      this.router.navigate(['']).then(() => 
      this.getConsultantsWithNotification('Mise à jour avec succès')
      );
    }else{
      this.consultantService.getConsultants().subscribe(
        (response: Consultant[]) => {
          this.consultants = response;
        },
        (error: HttpErrorResponse) => {
          this.logout();
        }
      );
    }
    
  }
  public getConsultantsWithNotification(msg: any): void {
  this.consultantService.getConsultants().subscribe(
    (response: Consultant[]) => {
      this.consultants = response;
      this.notificationsService.onSuccess(msg);
      
     
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
        //this.onDeleteConsultant(consultant.id);
        this.router.navigate(['']).then(() =>
        this.onDeleteConsultant(consultant.id)
        );
      }
    });
  }

  public onDeleteConsultant(id: number): void {
    this.consultantService.deleteConsultant(id).subscribe(
      (response: void) => {
        this.notificationsService.onSuccess("Supprimé avec succès");
        this.getConsultants();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
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
