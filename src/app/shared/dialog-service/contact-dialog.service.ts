import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from 'src/app/contact-dialog/contact-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ContactDialogService {

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(msg){
    return this.dialog.open(ContactDialogComponent,{
      width:"60%",
      height: "600px",
      panelClass:'confirm-dialog-container',
      disableClose:true,
      autoFocus:true,
      data :{
        message:msg
      }
    });
  }
}
