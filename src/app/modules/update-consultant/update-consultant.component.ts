import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Consultant } from '../consultant/consultant';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'app-update-consultant',
  templateUrl: './update-consultant.component.html',
  styleUrls: ['./update-consultant.component.css']
})
export class UpdateConsultantComponent implements OnInit {
  id: number;
  consultant: Consultant;
  panelTitle : string;
  buttonValue:string;
  obligatoire:string ="";
  tab: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private consultantService: ConsultantService
    ) { }

  ngOnInit(): void {
    this.consultant = new Consultant();

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.panelTitle = "Informations personnelles";
      this.buttonValue = "Enregistrer";
      this.consultantService.getConsultant(this.id)
      .subscribe(data => {
        this.consultant = data;
      }, error => console.log(error));
    }else{
      this.panelTitle = "Create consultant";
      this.buttonValue = "Create";
      this.obligatoire="*"
    }
    
    
  }

  public onUpdateConsultant(consultant: Consultant): void {

    if (consultant.id) {
      this.consultantService.updateConsultant(consultant).subscribe(
        (response: Consultant) => {
          this.gotoList('us');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }else{
      this.consultantService.addConsultant(consultant).subscribe(
        (response: Consultant) => {
          this.gotoList('as');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  gotoList(msg) {
    this.router.navigate(['/admin', {success: msg}]);

  }

  onClick(event){
    this.tab = event.index;
    
  }
}


