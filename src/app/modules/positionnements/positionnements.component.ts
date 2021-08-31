import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Positionnement } from './positionnement';
import { PositionnementService } from './positionnement.service';

@Component({
  selector: 'app-positionnements',
  templateUrl: './positionnements.component.html',
  styleUrls: ['./positionnements.component.css']
})
export class PositionnementsComponent implements OnInit {
  public positionnements: Positionnement[];

  constructor(private positionnementService: PositionnementService, private router: Router){}

  ngOnInit() {
    this.getPositionnements();
  }

  public getPositionnements(): void {
    this.positionnementService.getPositionnements().subscribe(
      (response: Positionnement[]) => {
        console.log(response);
        
        this.positionnements = response;
      },
      (error: HttpErrorResponse) => {
       
        alert(error.message);
      }
    );
  }
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-positionnement-form').click();
    this.positionnementService.addPositionnement(addForm.value).subscribe(
      (response: Positionnement) => {
        console.log(response);
        this.getPositionnements();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchPositionnements(key: string): void {
   
    this.positionnementService.findByKeyword(key).subscribe(
      (response: Positionnement[]) => {
        this.positionnements = response;
      }
    );
  }

  updatePositionnement(id: number){
    this.router.navigate(['/admin/update', id]);
  }
  addPositionnement(){
    this.router.navigate(['/admin/add']);
  }

 

  public onDeletePositionnement(id: number): void {
    this.positionnementService.deletePositionnement(id).subscribe(
      (response: void) => {
        this.getPositionnements();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  getDivClass(statut: string){
    switch(statut) { 
      case "Sortie": { 
         return"widget-26-job-category bg-soft-danger";
      } 
      case "En mission": { 
         return "widget-26-job-category bg-soft-warning";
      } 
      default: { 
         return "widget-26-job-category bg-soft-success"
      } 
  }
}
  getIClass(statut: string){
     switch(statut) { 
      case "Sortie": { 
         return "indicator bg-danger";
      } 
      case "En mission": { 
         return "indicator bg-warning";
      } 
      default: { 
         return "indicator bg-success";
      } 
    }
  }
}

