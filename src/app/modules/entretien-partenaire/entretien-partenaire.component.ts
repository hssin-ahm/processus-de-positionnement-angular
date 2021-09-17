import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog-service/dialog.service';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';
import { Entretien } from 'src/app/_services/entretienPartenaire/entretien';
import { EntretienPartenaireService } from 'src/app/_services/entretienPartenaire/entretien-partenaire.service';
import { Consultant } from '../consultant/consultant';

@Component({
  selector: 'app-entretien-partenaire',
  templateUrl: './entretien-partenaire.component.html',
  styleUrls: ['./entretien-partenaire.component.css']
})
export class EntretienPartenaireComponent implements OnInit {

  dataSource: MatTableDataSource<Entretien>;
  entretiens: Entretien[] = [];
  entretien: Entretien = new Entretien();
  id: number;

  cvEnvoyes: CvEnvoye[];

  columns: string[] = ["dateEntretien", "typeEntretien", "tjm", "remarque", "statut", "actions"]

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  panelTitle: string = "Détails";
  consultant: Consultant;
  tjm: number;
  iClass: string;


  constructor(
    private entretienPartenaireService: EntretienPartenaireService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private notificationsService: notificationsService,
    private cvEnvoyeService: CvEnvoyeService
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEntretiensByConsultantId();

  }

  getEntretiensByConsultantId() {
    this.entretienPartenaireService.getAllEntretiensByConsultantId(this.id).subscribe(
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
  warn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.notificationsService.onWarn("pas d'entrtien partenaire de ce consultant")
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

  updateEntretien(entretien: Entretien) { 
    this.entretien = entretien;
    this.iClass = this.getIClass(this.entretien.statut);
    this.display();
  }

  display() {
    const table = document.getElementById('tableCv');
    const addEntretien = document.getElementById('addEntretien');
    if (table.style.display == "block") {
      table.style.display = "none";
      addEntretien.style.display = "block";
      if (!this.entretien.idEntretien) {
        this.getCvEnvoyeByConsultantId();
      }
    } else {
      addEntretien.style.display = "none";
      table.style.display = "block"; 
      this.entretien = new Entretien();
      this.getEntretiensByConsultantId();

    }
  }



  public onOpenDeleteModal(entretien: Entretien): void {
    this.dialogService.openConfirmDialog("Êtes-vous sûr de vouloir supprimer ")
    .afterClosed().subscribe(res => {
      if (res) {
        this.onDeleteEntretien(entretien.idEntretien);
        this.notificationsService.onSuccess("Supprimé avec succès");
      }
    });
  }



  public onDeleteEntretien(id: number): void {
    this.entretienPartenaireService.deleteEntretien(id).subscribe(
      (response: void) => {
        this.getEntretiensByConsultantId();
      },
      (error: HttpErrorResponse) => {
        this.notificationsService.onError("Quelque chose ne va pas");
      }
    );
  }
  getIClass(statut: String) {
    switch (statut) {
      case "Qualifié": {
        return "indicator bg-success";
      }
      case "En attente": {
        return "indicator bg-warning";
      }
      default: {
        return "indicator bg-danger";
      }
    }
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
  onChange(deviceValue) {
    switch (deviceValue) {
      case "Qualifié": {
        this.iClass = "indicator bg-success";
        break
      }
      case "En attente": {
        this.iClass = "indicator bg-warning";
        break
      }
      default: {
        this.iClass = "indicator bg-danger";
        break
      }
    }
  }
}
