import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ContactDialogService } from 'src/app/shared/dialog-service/contact-dialog.service';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Briefing } from 'src/app/_services/briefing/briefing';
import { BriefingService } from 'src/app/_services/briefing/briefing.service';
import { Contact } from 'src/app/_services/contact/contact';
import { ContactService } from 'src/app/_services/contact/contact.service';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-briefing',
  templateUrl: './briefing.component.html',
  styleUrls: ['./briefing.component.css']
})
export class BriefingComponent implements OnInit {

  dataSource: MatTableDataSource<Briefing>;
  briefings : Briefing[] = [];
  briefing: Briefing = new Briefing();
  id : number;
  contacts: Contact[]; 
  newContacts: Contact[];

  toppings = new FormControl();
  toppingList: string[] = [];
  updateToppingList: string[] = [];

  columns: string[] = ["dateBriefing", "type", "contact", "remarque", "statut", "actions"]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Ajouter";
  consultant: Consultant;
  

  constructor(private briefingService: BriefingService, 
    private route: ActivatedRoute, 
    private contactDialogService:ContactDialogService,
    private ContactService: ContactService, 
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService : ConsultantService,
    private contactService: ContactService
    ) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getBriefingByConsultantId();

    this.getContacts();
    
    
  }

  getBriefingByConsultantId(){
    this.briefingService.getBriefingByConsultantId(this.id).subscribe(
      response=>{
        this.briefings = response;
        this.dataSource =  new MatTableDataSource(this.briefings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (response.length == 0) {
          this.warn();
        }
      }
    )
  }
  warn(){
    return new Promise((resolve , reject) => {
      setTimeout(() => {
          this.notificationsService.onWarn("pas de briefing de ce consultant")
        resolve("function done");
      }, 500);
    });
   
  }
  addContactToTtoppingList(contacts: Contact[]) {
    this.toppingList = [];
    contacts.forEach(element => {
     
     this.toppingList.push(element.prenom + " " + element.nom);
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
  getFirstContact(contact: Contact, row: any){
    
    if (contact[0]) {
      return contact[0]['prenom'] + " " +contact[0]['nom'];
    }
    return "Pas de contact";
  
   }

   updateBriefing(briefing: Briefing){
     
    this.panelTitle = "Modifier";
    this.briefing = briefing;
    this.addContactToTtoppingList(briefing.contact);
    
    briefing.contactName = this.toppingList;
    this.getContacts();
    this.display();
   }

   display(){
    const table = document.getElementById('tableCv');
    const addBriefing = document.getElementById('addBriefing');
    if (table.style.display == "block") {
      table.style.display = "none";
      addBriefing.style.display = "block";
    }else {
      addBriefing.style.display = "none";
      table.style.display = "block";
      this.panelTitle = "Ajouter";
      this.briefing = new Briefing();
      this.getBriefingByConsultantId();

    }
   
   }
   public onOpenContactModal(nomContact: String): void{
    if (nomContact) {
      var contact: Contact;
      this.contacts.forEach(element => {
          if ((element.prenom + " " + element.nom) == nomContact) {
            contact = element;
          }
      });
      
      this.contactDialogService.openConfirmDialog(contact)
      .afterClosed().subscribe(res => {
        if (res) {
          this.getContacts();
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
      });
    }else{
    this.contactDialogService.openConfirmDialog(null)
    .afterClosed().subscribe(res => {
      if (res) {
        this.getContacts();
        this.notificationsService.onSuccess("Ajout réussi");
      }
    });

    }
     
  }
  public getContacts(): void {
    this.ContactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        this.addContactToTtoppingList(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getConsultant(consultantId: number): void {
    this.consultantService.getConsultant(consultantId).subscribe(
      (response: Consultant) => {
        this.briefing.consultant = response;
        delete this.briefing.contactName;
        delete this.briefing.consultantId;
        
        this.onModifyBriefing(this.briefing);

        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  refreshTheList(){
    this.getContacts();
  }
  onUpdateBriefing(cvForm: NgForm){
    this.newContacts = [];
      this.contacts.forEach(element => {
        cvForm.value['contactName'].forEach(contactName => {
          if ((element.prenom + " " + element.nom) == contactName) {
            this.newContacts.push(element);
          }
        });
      });
      this.briefing = cvForm.value;
      this.briefing.contact = this.newContacts;
    if (cvForm.value.idBriefing) {
      this.getConsultant(this.id);
    }else{
      this.onAddBriefing(cvForm);
    
    }
    
  }
  

  public onModifyBriefing(briefing: Briefing): void {
    this.briefingService.updateBriefing(this.briefing).subscribe(
      (response: Briefing) => {
        this.display();
        this.notificationsService.onSuccess("Mise à jour avec succès");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddBriefing(briefing: NgForm): void {
    this.briefingService.addBriefing(briefing.value, this.id).subscribe(
      (response: Briefing) => {
        console.log(response);
        this.getBriefingByConsultantId();
        this.display();
        briefing.reset();
        this.notificationsService.onSuccess("Ajout réussi");
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  public onOpenDeleteModal(briefing: Briefing): void{


    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteBriefing(briefing.idBriefing);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });
  }
  public onOpenContactDeleteModal(nomContact: string): void{
    
    var contact: Contact;
    this.contacts.forEach(element => {
        if ((element.prenom + " " + element.nom) == nomContact) {
          contact = element;
        }
    });
  
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ce contact " + contact.prenom + " " + contact.nom)
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteContact(contact.idContact);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });  
  }  
  public onDeleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(
      (response: void) => {
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  public onDeleteBriefing(id: number): void {
    this.briefingService.deleteBriefing(id).subscribe(
      (response: void) => {
        this.getBriefingByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
}
