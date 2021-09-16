import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CvEnvoyeService } from 'src/app/_services/cvEnvoye/cv-envoye.service';
import { CvEnvoye } from 'src/app/_services/cvEnvoye/cvEnvoye';

@Component({
  selector: 'app-les-etapes',
  templateUrl: './les-etapes.component.html',
  styleUrls: ['./les-etapes.component.css']
})
export class LesEtapesComponent implements OnInit {
  id: any;
  consId: string;
  cvEnvoye: CvEnvoye;
  tjm: number = 5;
  index: number;
  constructor(
    private route: ActivatedRoute,
    private cvEnvoyeService: CvEnvoyeService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idcv'];
    this.consId = this.route.snapshot.queryParamMap.get('constId');
 
    this.getCvEnvoyeById(); 
  }

  getCvEnvoyeById() {
    this.cvEnvoyeService.getCvEnvoye(this.id).subscribe(
      response => {
        this.cvEnvoye = response;
        this.tjm = response.tjm;
        
      }
    )
  }

  tabs = [0];
  selected = new FormControl([0]);

  receiveMessage($event){
    if (this.tabs.indexOf($event) == -1) {
      this.tabs.push($event)
    }
    console.log(this.tabs);
    this.selected.setValue($event);
  }
 
  
  selectedIndexChange($event){
    this.index = $event;
    //this.selected.setValue($event);
    
  }
}
