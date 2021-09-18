import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ContactDialogService } from 'src/app/_services/dialog-service/contact-dialog.service';
import { DialogService } from 'src/app/_services/dialog-service/dialog.service';
import { notificationsService } from 'src/app/_services/dialog-service/notifications.service';
import { Contact } from 'src/app/_services/contact/contact';
import { ContactService } from 'src/app/_services/contact/contact.service';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  dataSource: MatTableDataSource<Contact>;
  contacts: Contact[] = [];
  contact: Contact = new Contact();
  id: number;

  toppings = new FormControl();
  toppingList: string[] = [];
  updateToppingList: string[] = [];

  columns: string[] = ["prenom", "nom", "mail", "poste", "telephone", "actions"]

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Ajouter";
 
  iClass: string;


  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private contactDialogService: ContactDialogService,
    private ContactService: ContactService,
    private dialogService: DialogService,
    private notificationsService: notificationsService
  ) {

  }

  ngOnInit(): void {

    this.getContacts();


  }

  public getContacts(): void {
    this.ContactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter(event) {
    this.searchKey = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  public onOpenContactModal(contact: Contact): void {
    if (contact.idContact) {
     
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

  public onOpenContactDeleteModal(contact: Contact): void {


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
