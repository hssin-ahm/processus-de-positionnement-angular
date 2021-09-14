import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-les-etapes',
  templateUrl: './les-etapes.component.html',
  styleUrls: ['./les-etapes.component.css']
})
export class LesEtapesComponent implements OnInit {
  id: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }
  tabs = ['cv-envoye', 'entretien-partenaire', 'positionnement-client', 'briefing', 'entretien-client', 'test-technique-client', 'validation'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  selectedIndexChange($event){
    this.selected.setValue($event);
    console.log(this.selected.value);
    
  }
}
