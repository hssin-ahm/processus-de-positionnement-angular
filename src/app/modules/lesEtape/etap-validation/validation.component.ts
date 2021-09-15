import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { notificationsService } from 'src/app/shared/dialog-service/notifications.service';
import { Validation } from 'src/app/_services/validation/validation';
import { ValidationService } from 'src/app/_services/validation/validation.service';

@Component({
  selector: 'app-etap-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  validations: Validation[] = [];
  validation: Validation = new Validation();
  id: number;
 

  searchKey: string;
  panelTitle: string = "Modifier"; 
  tjm: number;
  iClass: string;
  consId: any;
  @Output() event = new EventEmitter<number>()

  constructor(
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private notificationsService: notificationsService
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    
    this.consId = this.route.snapshot.queryParamMap.get('constId');
    console.log(this.id);
 
    this.getValidationById(); 
  }

  
  getValidationById() {
    this.validationService.getValidationsByCvId(this.id).subscribe(
      response => {
        this.validation = response;
        if (response == null) {
          this.validation = new Validation();
          this.panelTitle = "Ajouter";
        }else{
          this.iClass = this.getIClass(this.validation.feedback); 
          this.event.emit(6);
        }
      }
    )
  } 
  getIClass(feedback: String) {
    switch (feedback) {
      case "Consultant retenu": {
        return "indicator bg-success";
      }
      case "Non retenu": {
        return "indicator bg-danger";
      }
      default: {
        return "indicator bg-warning";
      }
    }
  }
  
  onUpdateValidation(entForm: NgForm) {
    this.validation = entForm.value;
    this.onModifyValidation(this.validation);

    
  }


  public onModifyValidation(validation: Validation): void {
    //Validation.cvEnvoyee = this.cvEnvoye;
    
    this.validationService.updateValidationCv(validation, this.id, this.consId).subscribe(
      (response: Validation) => {
        if (this.panelTitle == "Ajouter") {
          this.notificationsService.onSuccess("Ajout réussi");
        }else{
          this.notificationsService.onSuccess("Mise à jour avec succès");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onChange(deviceValue) {
    switch (deviceValue) {
      case "Consultant retenu": {
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
