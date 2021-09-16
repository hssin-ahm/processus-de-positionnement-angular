import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactDialogService } from 'src/app/shared/dialog-service/contact-dialog.service';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Briefing } from 'src/app/_services/briefing/briefing';
import { BriefingService } from 'src/app/_services/briefing/briefing.service';
import { Contact } from 'src/app/_services/contact/contact';
import { ContactService } from 'src/app/_services/contact/contact.service';

@Component({
  selector: 'app-etap-briefing',
  templateUrl: './etap-briefing.component.html',
  styleUrls: ['./etap-briefing.component.css']
})
export class EtapBriefingComponent implements OnInit {

  @Output() event = new EventEmitter<number>()
  id: number;
  briefing: Briefing = new Briefing();
  panelTitle: string = "Modifier";
  
  contacts: Contact[];
  newContacts: Contact[];

  toppings = new FormControl();
  toppingList: string[] = [];
  consId: any;

  constructor(
    private briefingService: BriefingService,
    private route: ActivatedRoute,
    private contactDialogService: ContactDialogService,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    this.getBriefingByCvId();
    this.refreshTheList()
  }
  nextEtape(){
    this.event.emit(4);
  }
  getBriefingByCvId() {
    this.briefingService.getBriefingsByCvId(this.id).subscribe(
      response => {
        this.briefing = response;
        if (response == null) {
          this.briefing = new Briefing();
          this.panelTitle = "Ajouter";
        }else{
          this.addContactToTtoppingList(this.briefing.contact);
          this.briefing.contactName = this.toppingList;
          this.getContacts();
          this.event.emit(3);

        }
      }
    )
  }

  addContactToTtoppingList(contacts: Contact[]) {
    this.toppingList = [];
    contacts.forEach(element => {
      this.toppingList.push(element.prenom + " " + element.nom);
    });
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
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        this.addContactToTtoppingList(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  refreshTheList() {
    this.getContacts();
  }
  onUpdateBriefing(cvForm: NgForm) {
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
     
    this.onModifyBriefing(this.briefing);
   

  }


  public onModifyBriefing(Briefing: Briefing): void {
    this.briefingService.updateBriefingOfcv(Briefing, this.id, this.consId).subscribe(
      (response: Briefing) => {
        if (this.panelTitle == "Ajouter") {
          this.notificationsService.onSuccess("Ajout réussi");
          this.panelTitle = "Modifier"
        }else{
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
        this.getBriefingByCvId();
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

  
  


}
