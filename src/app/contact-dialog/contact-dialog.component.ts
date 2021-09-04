import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { notificationsService } from '../shared/dialog-service/notifications.service';
import { Contact } from '../_services/contact/contact';
import { ContactService } from '../_services/contact/contact.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {
  pannelTitle: string = "Ajouter";

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<MatConfirmDialogComponent>, private contactService: ContactService,
  private notificationsService: notificationsService,
  ) { }

  contact: Contact = this.data.contact;
  ngOnInit(): void {
    if (this.contact) {
      this.pannelTitle = "Modifier";
    }else{
      this.contact = new Contact(); 
    }
  }
 

  public onSubmit(addForm: NgForm): void {
    
    if (addForm.value.id) {
      
      var contact : Contact = new Contact();
      contact = addForm.value;
      contact.idContact = addForm.value.id;
      this.contactService.updateContact(contact).subscribe(
        (response: Contact) => {
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.notificationsService.onError("Quelque chose ne va pas");
          addForm.reset();
        }
      );
      
    }else{
      this.contactService.addContact(addForm.value).subscribe(
        (response: Contact) => {
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.notificationsService.onError("Quelque chose ne va pas");
          addForm.reset();
        }
      );
    }
  }
}
