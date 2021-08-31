import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/_services/contact/contact';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, NgForm } from '@angular/forms';
import { ContactDialogService } from 'src/app/shared/dialog-service/contact-dialog.service';
import { ContactService } from 'src/app/_services/contact/contact.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-cv-envoye',
  templateUrl: './cv-envoye.component.html',
  styleUrls: ['./cv-envoye.component.css']
})
export class CvEnvoyeComponent implements OnInit {
  dataSource: MatTableDataSource<CvEnvoye>;
  cvEnvoyes : CvEnvoye[] = [];
  cvEnvoye: CvEnvoye = new CvEnvoye();
  id : number;
  contacts: Contact[]; 
  newContacts: Contact[];

  toppings = new FormControl();
  toppingList: string[] = [];

  columns: string[] = ["dateEnvoi", "partenairClient", "nomSociete", "contact", "tjm", "remarques", "statut"]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchKey: string;

  constructor(private cvEnvoyeService: CvEnvoyeService, 
    private route: ActivatedRoute, 
    private contactDialogService:ContactDialogService,
    private ContactService: ContactService
    ) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCvEnvoyeByConsultantId();

    this.getContacts();
    
    
  }

  getCvEnvoyeByConsultantId(){
    this.cvEnvoyeService.getCvEnvoyeByConsultantId(this.id).subscribe(
      response=>{
        console.log(response);
        
        this.cvEnvoyes = response;
        this.dataSource =  new MatTableDataSource(this.cvEnvoyes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  addContactToTtoppingList(contacts: Contact[]) {
    this.toppingList = [];
    contacts.forEach(element => {
      console.log(element.nom);
     
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
      return contact[0]['nom'];
    }
    return "Pas de contact";
  
   }

   display(){
    const table = document.getElementById('tableCv');
    const addCvEnvoye = document.getElementById('addCvEnvoye');
    if (table.style.display == "block") {
      table.style.display = "none";
      addCvEnvoye.style.display = "block";
    }else {
      addCvEnvoye.style.display = "none";
      table.style.display = "block";
    }
   
   }
   public onOpenContactModal(): void{


    this.contactDialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
    
    });
  }
  public getContacts(): void {
    this.ContactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        this.addContactToTtoppingList(response);
        console.log(this.contacts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  refreshTheList(){
    this.getContacts();
  }
  onUpdateCvEnvoye(editForm: NgForm){
    console.log(editForm.value);
    debugger
    this.newContacts = [];
    this.contacts.forEach(element => {
      editForm.value['contactName'].forEach(contactName => {
        if ((element.prenom + " " + element.nom) == contactName) {
          this.newContacts.push(element);
        }
      });
    });
    console.log(this.newContacts);
    this.cvEnvoye = editForm.value;
    this.cvEnvoye.contact = this.newContacts
    
    console.log(this.cvEnvoye);
    debugger
    this.onAddCvEnvoye(this.cvEnvoye);
    
  }
  public onAddCvEnvoye(cvEnvoye: CvEnvoye): void {
    this.cvEnvoyeService.addCvEnvoye(cvEnvoye, this.id).subscribe(
      (response: CvEnvoye) => {
        console.log(response);
        this.getCvEnvoyeByConsultantId();
        this.display();
      },
      (error: HttpErrorResponse) => {
       alert(error.message);
      }
    );
  }
  
}
