import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog-service/dialog.service';
import { notificationsService } from 'src/app/_services/dialog-service/notifications.service';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';
import { EntretienClientService } from 'src/app/_services/entretienClient/entretien-client.service';
import { EntretienClient } from 'src/app/_services/entretienClient/entretienClient';
import { Entretien } from 'src/app/_services/entretienPartenaire/entretien';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-entretien-client',
  templateUrl: './entretien-client.component.html',
  styleUrls: ['./entretien-client.component.css']
})
export class EntretienClientComponent implements OnInit {

  dataSource: MatTableDataSource<EntretienClient>;
  entretiens: EntretienClient[] = [];
  entretien: EntretienClient = new EntretienClient();
  id: number;

  toppings = new FormControl();
  toppingList: string[] = [];
  updateToppingList: string[] = [];
  cvEnvoyes: CvEnvoye[];

  columns: string[] = ["dateEntretienClient", "nomDuClient", "typeEntretienClient", "tjm", "remarque", "statut", "actions"]

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Détails";
  consultant: Consultant;
  tjm: number;
  iClass: string;


  constructor(
    private entretienClientService: EntretienClientService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private consultantService: ConsultantService,
    private cvEnvoyeService: CvEnvoyeService
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEntretiensByConsultantId();

  }

  getEntretiensByConsultantId() {
    this.entretienClientService.getAllEntretiensByConsultantId(this.id).subscribe(
      response => {
        this.entretiens = response;
        this.dataSource = new MatTableDataSource(this.entretiens);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.iClass = "";
        
        if (response.length == 0) {
          this.warn();
        }
      }
    )
  }
  warn(){
    return new Promise((resolve , reject) => {
      setTimeout(() => {
          this.notificationsService.onWarn("pas d'entretien client de ce consultant")
        resolve("function done");
      }, 500);
    });
   
  }

  onSearchClear() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter(event) {
    this.searchKey = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  updateEntretien(entretien: EntretienClient) {
    this.entretien = entretien;
    this.display();
  }

  display() {
    const table = document.getElementById('tableCv');
    const addEntretien = document.getElementById('addEntretien');
    if (table.style.display == "block") {
      table.style.display = "none";
      addEntretien.style.display = "block";
      if (!this.entretien.idEntretienClient) {
        this.getCvEnvoyeByConsultantId();
      }
    } else {
      addEntretien.style.display = "none";
      table.style.display = "block";
      this.entretien = new EntretienClient();
      this.getEntretiensByConsultantId();

    }
  }
 

  public onOpenDeleteModal(entretien: EntretienClient): void {
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
      .afterClosed().subscribe(res => {
        if (res) {
          this.onDeleteEntretien(entretien.idEntretienClient);
          this.notificationsService.onSuccess("Supprimé avec succès");
        }
      });
  }



  public onDeleteEntretien(id: number): void {
    this.entretienClientService.deleteEntretien(id).subscribe(
      (response: void) => {
        this.getEntretiensByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  
  getCvEnvoyeByConsultantId() {
    this.cvEnvoyeService.getCvEnvoyeByConsultantId(this.id).subscribe(
      response => {
        this.cvEnvoyes = response;
        this.getMoyenOfTjm();

      }
    )
  }

  getMoyenOfTjm() {
    var tjms = 0;
    if (this.cvEnvoyes) {
      this.cvEnvoyes.forEach(element => {
        tjms += element.tjm;
      });
      this.tjm = tjms / this.cvEnvoyes.length;
    }
    this.entretien.tjm = Math.trunc(this.tjm);
  }
  

}
