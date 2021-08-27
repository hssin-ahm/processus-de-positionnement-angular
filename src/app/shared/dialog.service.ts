import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(msg){
    return this.dialog.open(MatConfirmDialogComponent,{
      width:"390px",
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data :{
        message:msg
      },
      position: {top: '2%', left: '38%'}
    });
  }
}
