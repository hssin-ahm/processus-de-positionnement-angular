import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entr-partenaire',
  templateUrl: './entr-partenaire.component.html',
  styleUrls: ['./entr-partenaire.component.css']
})
export class EntrPartenaireComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

}
