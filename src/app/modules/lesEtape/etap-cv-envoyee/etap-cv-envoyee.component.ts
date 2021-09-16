import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactDialogService } from 'src/app/shared/dialog-service/contact-dialog.service';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Contact } from 'src/app/_services/contact/contact';
import { ContactService } from 'src/app/_services/contact/contact.service';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye'; 
import { Consultant } from '../../consultant/consultant';
import { ConsultantService } from '../../consultant/consultant.service';

@Component({
  selector: 'app-etap-cv-envoyee',
  templateUrl: './etap-cv-envoyee.component.html',
  styleUrls: ['./etap-cv-envoyee.component.css']
})
export class EtapCvEnvoyeeComponent implements OnInit {
  
  id: number;
  cvEnvoye: CvEnvoye = new CvEnvoye();
  iClass: string;
  panelTitle: string = "Modifier";
  
  contacts: Contact[];
  newContacts: Contact[];

  toppings = new FormControl();
  toppingList: string[] = [];
  consId: any;
  selected: number;
  lesEtapes : string[];
  etapeActuel: string;

  constructor(
    private cvEnvoyeService: CvEnvoyeService,
    private route: ActivatedRoute,
    private contactDialogService: ContactDialogService,
    private ContactService: ContactService,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService: ConsultantService,
    private contactService: ContactService
  ) { }
  @Input() tabs : [];
  @Output() event = new EventEmitter<number>();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    this.consId = this.route.snapshot.queryParamMap.get('constId'); 
    if (this.tabs) {
      this.lesEtapes = ["CV envoyé", "Entretien / Test technique partenaire", "Positionnement client", "Briefing", "Entretien Client", "Entretien / Test technique client", "Validation client"]
      
      if (this.cvEnvoye.partenairClient == "Client") {
        this.cvEnvoye.etapeActuel = this.lesEtapes[this.tabs.length - 2];
      }else{
        this.cvEnvoye.etapeActuel = this.lesEtapes[this.tabs.length - 1];
      }
     
    }
    console.log(this.cvEnvoye.etapeActuel);
    this.getCvEnvoyeById(this.cvEnvoye.etapeActuel);
    
  }

  getCvEnvoyeById(etapeActuel: string) {
    this.cvEnvoyeService.getCvEnvoye(this.id).subscribe(
      response => {
        this.cvEnvoye = response;
        this.iClass = this.getIClass(this.cvEnvoye.statut);
        this.addContactToTtoppingList(this.cvEnvoye.contact);
        this.cvEnvoye.contactName = this.toppingList;
        this.cvEnvoye.etapeActuel =  etapeActuel;
        this.getContacts();
        this.addEtapeActuel(this.cvEnvoye);
      }
    )
  }

  addContactToTtoppingList(contacts: Contact[]) {
    this.toppingList = [];
    contacts.forEach(element => {
      this.toppingList.push(element.prenom + " " + element.nom);
    });
    
  }
  nextEtape(){
    if (this.cvEnvoye.partenairClient == "Client") {
      this.event.emit(2);  
    }else{
      this.event.emit(1);
    }
  }

  public addEtapeActuel(cvEnvoye: CvEnvoye): void {
    this.cvEnvoyeService.updateCvEnvoye(cvEnvoye).subscribe(
      (response: CvEnvoye) => {
        this.cvEnvoye.etapeActuel = response.etapeActuel;
        this.etapeActuel = response.etapeActuel;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
 
  public onOpenContactModal(nomContact: String): void {
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
    } else {
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
    this.consultantService.getConsultant(this.consId).subscribe(
      (response: Consultant) => {
        this.cvEnvoye.consultant = response;
        this.cvEnvoye.idcv = this.cvEnvoye.id;
        delete this.cvEnvoye.id;
        delete this.cvEnvoye.contactName;
        delete this.cvEnvoye.consultantId;

        this.onModifyCvEnvoye(this.cvEnvoye);


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  refreshTheList() {
    this.getContacts();
  }
  onUpdateCvEnvoye(cvForm: NgForm) {
    this.newContacts = [];
    this.contacts.forEach(element => {
      cvForm.value['contactName'].forEach(contactName => {
        if ((element.prenom + " " + element.nom) == contactName) {
          this.newContacts.push(element);
        }
      });
    });
    this.cvEnvoye = cvForm.value;
    this.cvEnvoye.contact = this.newContacts;
     
    this.getConsultant(this.id);
   

  }


  public onModifyCvEnvoye(cvEnvoye: CvEnvoye): void {
    this.cvEnvoyeService.updateCvEnvoye(cvEnvoye).subscribe(
      (response: CvEnvoye) => {
        this.notificationsService.onSuccess("Mise à jour avec succès");
        this.getCvEnvoyeById(this.cvEnvoye.etapeActuel)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   

  
  public onOpenContactDeleteModal(nomContact: string): void {

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

  
  getIClass(statut: string) {
    switch (statut) {
      case "Cv en cours": {
        return "indicator bg-warning";
      }
      default: {
        return "indicator bg-success";
      }
    }
  }
  onChange(deviceValue) {
    switch (deviceValue) {
      case "Cv en cours": {
        this.iClass = "indicator bg-warning";
        break;
      }
      default: {
        this.iClass = "indicator bg-success";
        break;
      }
    }
  }
}
