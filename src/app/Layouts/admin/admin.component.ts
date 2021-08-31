import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
  sidebarToggler(){
  this.sideBarOpen = !this.sideBarOpen;
}

}
